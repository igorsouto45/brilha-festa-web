import { createFileRoute } from "@tanstack/react-router";

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

        // Only run if no admin exists yet
        const { count, error: countErr } = await supabaseAdmin
          .from("user_roles")
          .select("*", { count: "exact", head: true })
          .eq("role", "admin");
        if (countErr) {
          return new Response(JSON.stringify({ error: countErr.message }), { status: 500 });
        }
        if ((count ?? 0) > 0) {
          return new Response(JSON.stringify({ ok: true, message: "Admin já existe." }), {
            headers: { "content-type": "application/json" },
          });
        }

        // Try create user; if already exists, look them up
        let userId: string | null = null;
        const created = await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
        });
        if (created.error) {
          // fallback: find existing
          const list = await supabaseAdmin.auth.admin.listUsers();
          if (list.error) {
            return new Response(JSON.stringify({ error: list.error.message }), { status: 500 });
          }
          const existing = list.data.users.find((u) => u.email === email);
          if (!existing) {
            return new Response(JSON.stringify({ error: created.error.message }), { status: 500 });
          }
          userId = existing.id;
        } else {
          userId = created.data.user?.id ?? null;
        }
        if (!userId) {
          return new Response(JSON.stringify({ error: "No user id" }), { status: 500 });
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
