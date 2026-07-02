import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  CONTENT_KEYS,
  brinquedoImages,
  defaultBrinquedos,
  defaultFaq,
  defaultGaleria,
  defaultGaleriaImages,
  type BrinquedoItem,
  type FaqItem,
  type GaleriaContent,
} from "@/lib/site-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  ssr: false,
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Admin — Leal Locação" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

type AuthState = "loading" | "signed-out" | "not-admin" | "admin";

async function checkRole(): Promise<AuthState> {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return "signed-out";
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userData.user.id)
    .eq("role", "admin")
    .maybeSingle();
  if (error) return "not-admin";
  return data ? "admin" : "not-admin";
}

function AdminPage() {
  const [state, setState] = useState<AuthState>("loading");

  useEffect(() => {
    checkRole().then(setState);
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      checkRole().then(setState);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (state === "loading") {
    return <div className="p-10 text-center text-muted-foreground">Carregando…</div>;
  }
  if (state === "admin") return <AdminEditor onSignOut={() => setState("signed-out")} />;
  return <LoginForm notAdmin={state === "not-admin"} />;
}

function LoginForm({ notAdmin }: { notAdmin: boolean }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (res.error) {
      toast.error("Credenciais inválidas");
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Painel Admin — Leal</CardTitle>
        </CardHeader>
        <CardContent>
          {notAdmin && (
            <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              Esta conta não possui permissão de administrador.{" "}
              <button className="underline" onClick={signOut}>Sair</button>
            </div>
          )}
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando…" : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

const SIGNED_URL_TTL = 60 * 60 * 24 * 365 * 10; // 10 anos

async function uploadImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error: upErr } = await supabase.storage
    .from("site-images")
    .upload(path, file, { cacheControl: "31536000", upsert: false });
  if (upErr) throw upErr;
  const { data, error } = await supabase.storage
    .from("site-images")
    .createSignedUrl(path, SIGNED_URL_TTL);
  if (error || !data) throw error ?? new Error("signed url failed");
  return data.signedUrl;
}

function ImagePicker({
  value,
  fallback,
  onChange,
  label = "Imagem",
}: {
  value?: string;
  fallback?: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const preview = value || fallback;

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
      toast.success("Imagem enviada!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao enviar";
      toast.error(msg);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-3">
        {preview && (
          <img
            src={preview}
            alt=""
            className="h-20 w-20 rounded-md object-cover ring-1 ring-border"
          />
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? "Enviando…" : value ? "Trocar imagem" : "Enviar imagem"}
        </Button>
        {value && (
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}>
            Restaurar padrão
          </Button>
        )}
      </div>
    </div>
  );
}

function AdminEditor({ onSignOut }: { onSignOut: () => void }) {
  const [brinquedos, setBrinquedos] = useState<BrinquedoItem[]>(defaultBrinquedos);
  const [galeria, setGaleria] = useState<GaleriaContent>(defaultGaleria);
  const [faq, setFaq] = useState<FaqItem[]>(defaultFaq);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("site_content").select("section_key, data");
      const map = new Map((data ?? []).map((r) => [r.section_key, r.data as unknown]));
      const b = map.get(CONTENT_KEYS.brinquedos) as BrinquedoItem[] | undefined;
      const g = map.get(CONTENT_KEYS.galeria) as GaleriaContent | undefined;
      const f = map.get(CONTENT_KEYS.faq) as FaqItem[] | undefined;
      if (b && b.length > 0) setBrinquedos(b);
      if (g) setGaleria(g);
      if (f) setFaq(f);
      setLoading(false);
    })();
  }, []);

  const queryClient = useQueryClient();

  async function save(key: string, data: unknown) {
    setSaving(key);
    const { error } = await supabase.from("site_content").upsert({ section_key: key, data: data as never });
    setSaving(null);
    if (error) toast.error("Erro ao salvar: " + error.message);
    else {
      await queryClient.invalidateQueries({ queryKey: ["site_content"] });
      toast.success("Salvo!");
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    onSignOut();
  }

  if (loading) return <div className="p-10 text-center text-muted-foreground">Carregando conteúdo…</div>;

  const galeriaImgs = galeria.images ?? [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Painel Admin</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <a href="/" target="_blank" rel="noopener">Ver site</a>
          </Button>
          <Button variant="ghost" onClick={signOut}>Sair</Button>
        </div>
      </div>

      {/* Nossos Brinquedos */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Nossos Brinquedos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {brinquedos.map((b, i) => (
            <div key={i} className="space-y-3 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <Label>Brinquedo #{i + 1}</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setBrinquedos(brinquedos.filter((_, j) => j !== i))}
                >
                  Remover
                </Button>
              </div>
              <ImagePicker
                value={b.img}
                fallback={brinquedoImages[i]}
                onChange={(url) => {
                  const next = [...brinquedos];
                  next[i] = { ...next[i], img: url };
                  setBrinquedos(next);
                }}
                label="Foto"
              />
              <div>
                <Label>Nome</Label>
                <Input
                  value={b.nome}
                  onChange={(e) => {
                    const next = [...brinquedos];
                    next[i] = { ...next[i], nome: e.target.value };
                    setBrinquedos(next);
                  }}
                />
              </div>
              <div>
                <Label>Descrição</Label>
                <Textarea
                  value={b.desc}
                  onChange={(e) => {
                    const next = [...brinquedos];
                    next[i] = { ...next[i], desc: e.target.value };
                    setBrinquedos(next);
                  }}
                />
              </div>
            </div>
          ))}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() =>
                setBrinquedos([...brinquedos, { nome: "Novo brinquedo", desc: "", img: "" }])
              }
            >
              + Adicionar brinquedo
            </Button>
            <Button
              onClick={() => save(CONTENT_KEYS.brinquedos, brinquedos)}
              disabled={saving === CONTENT_KEYS.brinquedos}
            >
              {saving === CONTENT_KEYS.brinquedos ? "Salvando…" : "Salvar brinquedos"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Veja Nossos Brinquedos (Galeria) */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Veja Nossos Brinquedos (Galeria)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Título</Label>
            <Input value={galeria.title} onChange={(e) => setGaleria({ ...galeria, title: e.target.value })} />
          </div>
          <div>
            <Label>Subtítulo (opcional)</Label>
            <Textarea
              value={galeria.subtitle}
              onChange={(e) => setGaleria({ ...galeria, subtitle: e.target.value })}
            />
          </div>

          <div className="space-y-3">
            <Label>Fotos da galeria</Label>
            <p className="text-xs text-muted-foreground">
              Se nenhuma foto for adicionada, as imagens padrão do site serão exibidas.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {galeriaImgs.map((url, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border p-3">
                  <img src={url} alt="" className="h-16 w-16 rounded object-cover ring-1 ring-border" />
                  <div className="flex flex-1 flex-col gap-1 text-sm">
                    <span className="font-medium">Foto #{i + 1}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="self-start"
                      onClick={() =>
                        setGaleria({
                          ...galeria,
                          images: galeriaImgs.filter((_, j) => j !== i),
                        })
                      }
                    >
                      Remover
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <ImagePicker
              fallback={galeriaImgs.length === 0 ? defaultGaleriaImages[0] : undefined}
              onChange={(url) => {
                if (!url) return;
                setGaleria({ ...galeria, images: [...galeriaImgs, url] });
              }}
              label="Adicionar nova foto"
            />
          </div>

          <Button
            onClick={() => save(CONTENT_KEYS.galeria, galeria)}
            disabled={saving === CONTENT_KEYS.galeria}
          >
            {saving === CONTENT_KEYS.galeria ? "Salvando…" : "Salvar galeria"}
          </Button>
        </CardContent>
      </Card>


      {/* Tudo o que você precisa saber (FAQ) */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Tudo o que Você Precisa Saber (FAQ)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {faq.map((item, i) => (
            <div key={i} className="space-y-2 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <Label>Pergunta #{i + 1}</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFaq(faq.filter((_, j) => j !== i))}
                >
                  Remover
                </Button>
              </div>
              <Input
                value={item.q}
                onChange={(e) => {
                  const next = [...faq];
                  next[i] = { ...next[i], q: e.target.value };
                  setFaq(next);
                }}
              />
              <Label>Resposta</Label>
              <Textarea
                value={item.a}
                onChange={(e) => {
                  const next = [...faq];
                  next[i] = { ...next[i], a: e.target.value };
                  setFaq(next);
                }}
              />
            </div>
          ))}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setFaq([...faq, { q: "", a: "" }])}
            >
              + Adicionar pergunta
            </Button>
            <Button
              onClick={() => save(CONTENT_KEYS.faq, faq)}
              disabled={saving === CONTENT_KEYS.faq}
            >
              {saving === CONTENT_KEYS.faq ? "Salvando…" : "Salvar FAQ"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
