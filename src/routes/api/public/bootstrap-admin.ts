import { createFileRoute } from "@tanstack/react-router";

async function adminFetch(path: string, init: RequestInit = {}) {
  const url = `${process.env.SUPABASE_URL}${path}`;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const headers = new Headers(init.headers);
  headers.set("apikey", key);
  headers.set("Authorization", `Bearer ${key}`);
  if (init.body && !headers.has("content-type")) headers.set("content-type", "application/json");
  return fetch(url, { ...init, headers });
}

export const Route = createFileRoute("/api/public/bootstrap-admin")({
  server: {
    handlers: {
      POST: async () => {
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;
        if (!email || !password) {
          return new Response(JSON.stringify({ error: "Missing ADMIN_EMAIL/ADMIN_PASSWORD" }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        // Short-circuit if any admin already exists
        const { count } = await supabaseAdmin
          .from("user_roles")
          .select("*", { count: "exact", head: true })
          .eq("role", "admin");
        if ((count ?? 0) > 0) {
          return new Response(JSON.stringify({ ok: true, message: "Admin já existe." }), {
            headers: { "content-type": "application/json" },
          });
        }

        // Create user via GoTrue admin REST (works with sb_secret_* keys)
        let userId: string | null = null;
        const createRes = await adminFetch("/auth/v1/admin/users", {
          method: "POST",
          body: JSON.stringify({ email, password, email_confirm: true }),
        });
        if (createRes.ok) {
          const j = (await createRes.json()) as { id?: string };
          userId = j.id ?? null;
        } else {
          // Might already exist — look them up
          const listRes = await adminFetch(
            `/auth/v1/admin/users?filter=${encodeURIComponent(email)}`,
          );
          if (!listRes.ok) {
            const t = await listRes.text();
            return new Response(JSON.stringify({ error: "list failed: " + t }), { status: 500 });
          }
          const listJson = (await listRes.json()) as { users?: Array<{ id: string; email: string }> };
          userId = listJson.users?.find((u) => u.email === email)?.id ?? null;
          if (!userId) {
            const t = await createRes.text();
            return new Response(JSON.stringify({ error: "create failed: " + t }), { status: 500 });
          }
        }

        const { error: roleErr } = await supabaseAdmin
          .from("user_roles")
          .insert({ user_id: userId, role: "admin" });
        if (roleErr && !roleErr.message.includes("duplicate")) {
          return new Response(JSON.stringify({ error: roleErr.message }), { status: 500 });
        }

        return new Response(JSON.stringify({ ok: true, userId }), {
          headers: { "content-type": "application/json" },
        });
      },
    },
  },
});
