import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-brand-blue">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-primary">Voltar ao início</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Esta página não carregou</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo deu errado. Tente novamente ou volte ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-primary"
          >
            Tentar novamente
          </button>
          <a href="/" className="btn-outline">Ir ao início</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Leal Locação de Brinquedos | Aluguel de Brinquedos para Festas" },
      {
        name: "description",
        content:
          "Aluguel de brinquedos para festas infantis, aniversários, eventos e confraternizações. Pula-pula, tobogã inflável, cama elástica, air hockey, futebol de mesa e piscina de bolinhas. Faça sua reserva pelo WhatsApp.",
      },
      { name: "author", content: "Leal Locação de Brinquedos" },
      { name: "theme-color", content: "#0057B8" },
      {
        name: "keywords",
        content:
          "locação de brinquedos, aluguel de brinquedos, aluguel de pula-pula, aluguel de cama elástica, brinquedos para festa infantil, piscina de bolinhas, tobogã inflável, festa infantil, air hockey, futebol de mesa",
      },
      { property: "og:title", content: "Leal Locação de Brinquedos | Aluguel de Brinquedos para Festas" },
      {
        property: "og:description",
        content:
          "A alegria da sua festa começa aqui! Alugue pula-pula, tobogã, cama elástica, piscina de bolinhas e muito mais. Reserve pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Leal Locação de Brinquedos" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Leal Locação de Brinquedos | Aluguel de Brinquedos para Festas" },
      {
        name: "twitter:description",
        content: "Aluguel de brinquedos para festas infantis, aniversários e eventos.",
      },
      { name: "description", content: "Leal Fiesta Fun is a vibrant, responsive website for toy rentals, facilitating party planning and bookings." },
      { property: "og:description", content: "Leal Fiesta Fun is a vibrant, responsive website for toy rentals, facilitating party planning and bookings." },
      { name: "twitter:description", content: "Leal Fiesta Fun is a vibrant, responsive website for toy rentals, facilitating party planning and bookings." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2c828d4a-c480-4a00-8502-7e0c472bf967/id-preview-9b1fac46--595c1e4e-547e-4f97-9fa6-c1e8fe59c86b.lovable.app-1782931564463.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2c828d4a-c480-4a00-8502-7e0c472bf967/id-preview-9b1fac46--595c1e4e-547e-4f97-9fa6-c1e8fe59c86b.lovable.app-1782931564463.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@500;600;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Leal Locação de Brinquedos",
          description:
            "Aluguel de brinquedos para festas infantis, aniversários, eventos e confraternizações.",
          telephone: "+5521996178608",
          url: "https://www.leallocacaodebrinquedos.com.br",
          sameAs: ["https://instagram.com/leallocacaodebrinquedos"],
          areaServed: "Rio de Janeiro",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
