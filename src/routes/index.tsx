import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import logoAsset from "@/assets/leal-logo.asset.json";
import heroFesta from "@/assets/hero-festa.webp";
import pulaPulaImg from "@/assets/pula-pula.webp";
import tobogaImg from "@/assets/toboga.webp";
import camaElasticaImg from "@/assets/cama-elastica.webp";
import airHockeyImg from "@/assets/air-hockey.webp";
import futebolMesaImg from "@/assets/futebol-mesa.webp";
import piscinaBolinhasImg from "@/assets/piscina-bolinhas.webp";
import brinquedosInfantisImg from "@/assets/brinquedos-infantis.webp";

const faqItems = [
  {
    q: "Quais tipos de brinquedos a Leal aluga?",
    a: "Alugamos brinquedos como pula-pula, tobogã inflável, cama elástica, air game, futebol de mesa, piscina de bolinhas e outras opções infantis.",
  },
  {
    q: "Como faço para reservar?",
    a: "Você pode clicar em qualquer botão de WhatsApp no site e falar diretamente com a equipe da Leal para consultar disponibilidade, valores e detalhes.",
  },
  {
    q: "Atendem quais tipos de eventos?",
    a: "Atendemos aniversários, eventos escolares, festas em condomínios, igrejas, confraternizações e eventos familiares.",
  },
  {
    q: "Preciso reservar com antecedência?",
    a: "Sim. O ideal é reservar com antecedência para garantir a disponibilidade dos brinquedos na data desejada.",
  },
  {
    q: "Posso tirar dúvidas pelo Instagram?",
    a: "Sim. Você também pode acompanhar novidades e falar com a Leal pelo Instagram @leallocacaodebrinquedos.",
  },
];

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    links: [
      { rel: "preload", as: "image", href: heroFesta, fetchpriority: "high" } as unknown as {
        rel: string;
        as: string;
        href: string;
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

const WA_MSG =
  "Olá! Vim pelo site da Leal Locação de Brinquedos e gostaria de fazer um orçamento para minha festa.";
const WA_1 = `https://wa.me/5521996178608?text=${encodeURIComponent(WA_MSG)}`;
const WA_2 = `https://wa.me/5521964983378?text=${encodeURIComponent(WA_MSG)}`;
const INSTAGRAM = "https://instagram.com/leallocacaodebrinquedos";

const brinquedoLink = (nome: string) =>
  `https://wa.me/5521996178608?text=${encodeURIComponent(
    `Olá! Gostaria de consultar disponibilidade para ${nome}.`,
  )}`;

const nav = [
  { href: "#inicio", label: "Início" },
  { href: "#brinquedos", label: "Brinquedos" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#por-que", label: "Por que a Leal" },
  { href: "#galeria", label: "Galeria" },
  { href: "#faq", label: "Dúvidas" },
  { href: "#contato", label: "Contato" },
];

const brinquedos = [
  {
    nome: "Pula-pula",
    img: pulaPulaImg,
    desc: "O clássico que não pode faltar em uma festa infantil. Diversão do começo ao fim.",
  },
  {
    nome: "Tobogã Inflável",
    img: tobogaImg,
    desc: "Grande, colorido e perfeito para deixar a criançada empolgada.",
  },
  {
    nome: "Cama Elástica",
    img: camaElasticaImg,
    desc: "Energia, movimento e muita diversão com segurança.",
  },
  {
    nome: "Air Game",
    img: airHockeyImg,
    desc: "Uma opção divertida para crianças maiores, jovens e adultos.",
  },
  {
    nome: "Futebol de Mesa",
    img: futebolMesaImg,
    desc: "Competição saudável e diversão para todas as idades.",
  },
  {
    nome: "Piscina de Bolinhas",
    img: piscinaBolinhasImg,
    desc: "Perfeita para os pequenos brincarem com conforto e alegria.",
  },
  {
    nome: "Brinquedos Infantis",
    img: brinquedosInfantisImg,
    desc: "Opções variadas para complementar sua festa e encantar as crianças.",
  },
];

const eventos = [
  { icon: "🎂", label: "Aniversários infantis" },
  { icon: "🏢", label: "Festas em condomínio" },
  { icon: "🏫", label: "Eventos escolares" },
  { icon: "⛪", label: "Igrejas" },
  { icon: "💼", label: "Empresas" },
  { icon: "👨‍👩‍👧", label: "Confraternizações familiares" },
];

const destaques = [
  {
    icon: "🎉",
    color: "var(--brand-red)",
    title: "Diversão garantida",
    text: "Brinquedos que deixam qualquer festa mais animada.",
  },
  {
    icon: "🛡️",
    color: "var(--brand-blue)",
    title: "Segurança em primeiro lugar",
    text: "Equipamentos pensados para crianças brincarem com tranquilidade.",
  },
  {
    icon: "🎈",
    color: "var(--brand-yellow)",
    title: "Ideal para eventos",
    text: "Aniversários, escolas, igrejas, condomínios e confraternizações.",
  },
  {
    icon: "💬",
    color: "var(--brand-green)",
    title: "Atendimento rápido",
    text: "Faça sua reserva de forma simples pelo WhatsApp.",
  },
];

const passos = [
  { n: 1, title: "Escolha os brinquedos", text: "Veja as opções disponíveis e escolha os ideais para sua festa." },
  { n: 2, title: "Fale pelo WhatsApp", text: "Entre em contato para consultar data, valores e disponibilidade." },
  { n: 3, title: "Confirme sua reserva", text: "Combine todos os detalhes do evento com a equipe da Leal." },
  { n: 4, title: "Aproveite a festa", text: "Nós cuidamos da diversão para você curtir o momento." },
];

const beneficios = [
  "Brinquedos coloridos e atrativos",
  "Atendimento rápido pelo WhatsApp",
  "Opções para diferentes idades",
  "Ideal para festas pequenas, médias e grandes",
  "Visual alegre que valoriza o evento",
  "Reserva simples e prática",
];

const faq = faqItems;

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.52 3.48A11.9 11.9 0 0 0 12.05 0C5.5 0 .2 5.3.2 11.85c0 2.09.55 4.13 1.6 5.93L0 24l6.38-1.67a11.83 11.83 0 0 0 5.67 1.44h.01c6.55 0 11.85-5.3 11.85-11.85 0-3.17-1.23-6.15-3.39-8.44ZM12.06 21.5h-.01a9.62 9.62 0 0 1-4.9-1.34l-.35-.21-3.79.99 1.02-3.69-.23-.38a9.62 9.62 0 0 1-1.47-5.12c0-5.32 4.33-9.65 9.66-9.65 2.58 0 5 1 6.82 2.83a9.6 9.6 0 0 1 2.83 6.82c0 5.32-4.33 9.65-9.66 9.65Zm5.29-7.22c-.29-.15-1.72-.85-1.98-.95-.27-.1-.46-.15-.66.15-.19.29-.75.94-.92 1.14-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.66-1.6-.91-2.19-.24-.57-.48-.49-.66-.5-.17-.01-.36-.01-.55-.01s-.51.07-.77.36c-.27.29-1 .98-1 2.39s1.03 2.77 1.17 2.96c.15.19 2.03 3.1 4.92 4.35.69.3 1.22.48 1.64.61.69.22 1.31.19 1.81.11.55-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.19-.55-.34Z" />
    </svg>
  );
}

function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b-4 border-brand-yellow bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <a href="#inicio" className="flex items-center gap-2">
            <img
              src={logoAsset.url}
              alt="Leal Locação de Brinquedos"
              width={128}
              height={128}
              className="h-28 w-auto md:h-32"
            />
          </a>
          <nav className="hidden items-center gap-6 lg:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="font-display text-[15px] font-semibold text-foreground/80 transition-colors hover:text-brand-red"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={WA_1} target="_blank" rel="noopener" className="btn-primary hidden md:inline-flex">
              <WhatsAppIcon /> Reservar agora
            </a>
            <button
              aria-label="Abrir menu"
              className="rounded-full border-2 border-brand-blue p-2 text-brand-blue lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-6 w-6">
                {menuOpen ? (
                  <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-t border-brand-yellow/60 bg-white lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-2 py-3 font-display font-semibold text-foreground/80 hover:bg-brand-yellow/20 hover:text-brand-red"
                >
                  {n.label}
                </a>
              ))}
              <a href={WA_1} target="_blank" rel="noopener" className="btn-primary mt-2">
                <WhatsAppIcon /> Reservar agora
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="inicio" className="relative overflow-hidden">
        <div className="bg-confetti absolute inset-0 opacity-40" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full opacity-20"
          style={{ background: "var(--brand-yellow)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full opacity-20"
          style={{ background: "var(--brand-red)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:px-6 md:py-20 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow/30 px-4 py-1.5 text-sm font-bold text-brand-blue-dark">
              🎈 Locação de brinquedos para festas
            </span>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] text-brand-blue-dark md:text-6xl">
              A alegria da sua festa <span className="text-brand-red">começa aqui!</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-foreground/75 md:text-xl">
              Aluguel de brinquedos para aniversários, eventos e confraternizações com{" "}
              <span className="font-bold text-brand-red">diversão</span>,{" "}
              <span className="font-bold text-brand-blue">segurança</span> e{" "}
              <span className="font-bold text-brand-green">praticidade</span>.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={WA_1} target="_blank" rel="noopener" className="btn-primary">
                <WhatsAppIcon /> Solicitar orçamento
              </a>
              <a href="#brinquedos" className="btn-outline">Ver brinquedos disponíveis</a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-foreground/70">
              <span className="flex items-center gap-1.5">⭐ Atendimento rápido</span>
              <span className="flex items-center gap-1.5">🛡️ Equipamentos seguros</span>
              <span className="flex items-center gap-1.5">🎨 Coloridos e alegres</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-brand-yellow via-brand-red to-brand-blue opacity-90" aria-hidden="true" />
            <img
              src={heroFesta}
              alt="Festa infantil com pula-pula, piscina de bolinhas e balões coloridos"
              width={1280}
              height={960}
              className="relative aspect-[4/3] w-full rounded-[2rem] object-cover shadow-2xl"
            />
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-white px-5 py-3 shadow-xl md:block">
              <p className="font-display text-2xl text-brand-red">100%</p>
              <p className="text-xs font-semibold text-foreground/70">diversão garantida</p>
            </div>
            <div className="absolute -top-5 -right-5 hidden rotate-6 rounded-2xl bg-brand-yellow px-5 py-3 shadow-xl md:block">
              <p className="font-display text-lg text-brand-blue-dark">Reserve já! 🎉</p>
            </div>
          </div>
        </div>
      </section>

      {/* Destaques */}
      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destaques.map((d) => (
            <div
              key={d.title}
              className="group rounded-3xl border-2 border-transparent bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{ borderColor: `color-mix(in oklab, ${d.color} 25%, white)` }}
            >
              <div
                className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
                style={{ background: `color-mix(in oklab, ${d.color} 20%, white)` }}
              >
                {d.icon}
              </div>
              <h3 className="font-display text-xl text-brand-blue-dark">{d.title}</h3>
              <p className="mt-2 text-sm text-foreground/70">{d.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Brinquedos */}
      <section id="brinquedos" className="relative bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-brand-red/10 px-4 py-1 text-sm font-bold text-brand-red">
              Nossos brinquedos
            </span>
            <h2 className="mt-3 font-display text-3xl text-brand-blue-dark md:text-5xl">
              Escolha a diversão perfeita para sua festa
            </h2>
            <p className="mt-3 text-foreground/70">
              Brinquedos coloridos e seguros para todas as idades. Toque em qualquer card para consultar disponibilidade.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {brinquedos.map((b) => (
              <article
                key={b.nome}
                className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={b.img}
                    alt={b.nome}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-full w-full object-contain p-4 transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl text-brand-blue-dark">{b.nome}</h3>
                  <p className="mt-2 flex-1 text-sm text-foreground/70">{b.desc}</p>
                  <a
                    href={brinquedoLink(b.nome)}
                    target="_blank"
                    rel="noopener"
                    className="btn-primary mt-5 w-full"
                  >
                    <WhatsAppIcon /> Consultar disponibilidade
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Perfeito para sua festa */}
      <section
        className="relative overflow-hidden py-16 md:py-20"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in oklab, var(--brand-yellow) 35%, white), color-mix(in oklab, var(--brand-blue) 20%, white))",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl text-brand-blue-dark md:text-5xl">
              Perfeito para aniversários, eventos e confraternizações!
            </h2>
            <p className="mt-4 text-foreground/75 md:text-lg">
              A Leal Locação de Brinquedos leva diversão para diferentes tipos de comemoração, ajudando você a criar
              momentos inesquecíveis com praticidade e segurança.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {eventos.map((e) => (
              <div
                key={e.label}
                className="flex items-center gap-4 rounded-2xl bg-white/90 p-5 shadow-sm ring-1 ring-white"
              >
                <span className="text-3xl">{e.icon}</span>
                <span className="font-display text-lg text-brand-blue-dark">{e.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={WA_1} target="_blank" rel="noopener" className="btn-accent">
              <WhatsAppIcon /> Quero levar diversão para minha festa
            </a>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-brand-green/15 px-4 py-1 text-sm font-bold text-brand-green">
            Como funciona
          </span>
          <h2 className="mt-3 font-display text-3xl text-brand-blue-dark md:text-5xl">Reservar é simples e rápido</h2>
        </div>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {passos.map((p, i) => {
            const cols = ["var(--brand-blue)", "var(--brand-red)", "var(--brand-yellow)", "var(--brand-green)"];
            return (
              <li key={p.n} className="relative rounded-3xl border-2 border-border bg-white p-6 shadow-md">
                <div
                  className="absolute -top-5 left-6 flex h-12 w-12 items-center justify-center rounded-full font-display text-xl font-bold text-white shadow-lg"
                  style={{ background: cols[i] }}
                >
                  {p.n}
                </div>
                <h3 className="mt-4 font-display text-xl text-brand-blue-dark">{p.title}</h3>
                <p className="mt-2 text-sm text-foreground/70">{p.text}</p>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Por que */}
      <section id="por-que" className="bg-cream py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-brand-blue/10 px-4 py-1 text-sm font-bold text-brand-blue">
              Por que escolher a Leal
            </span>
            <h2 className="mt-3 font-display text-3xl text-brand-blue-dark md:text-5xl">
              Sua festa merece diversão com responsabilidade
            </h2>
            <p className="mt-4 text-foreground/75">
              Na Leal Locação de Brinquedos, cada detalhe é pensado para transformar sua comemoração em uma experiência
              alegre, segura e inesquecível. Nosso atendimento é direto, prático e feito para facilitar a vida de quem
              está organizando a festa.
            </p>
            <a href={WA_1} target="_blank" rel="noopener" className="btn-primary mt-6">
              <WhatsAppIcon /> Falar com a Leal agora
            </a>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {beneficios.map((b, i) => {
              const cols = [
                "var(--brand-red)",
                "var(--brand-blue)",
                "var(--brand-yellow)",
                "var(--brand-green)",
                "var(--brand-red)",
                "var(--brand-blue)",
              ];
              return (
                <li key={b} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">
                  <span
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
                    style={{ background: cols[i] }}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span className="font-semibold text-foreground/85">{b}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Galeria */}
      <section id="galeria" className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-brand-yellow/30 px-4 py-1 text-sm font-bold text-brand-blue-dark">
            Galeria
          </span>
          <h2 className="mt-3 font-display text-3xl text-brand-blue-dark md:text-5xl">Veja nossos brinquedos</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[pulaPulaImg, camaElasticaImg, piscinaBolinhasImg, tobogaImg, airHockeyImg, futebolMesaImg, brinquedosInfantisImg, heroFesta].map(
            (img, i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden rounded-3xl bg-white shadow-md ring-2 ring-white"
              >
                <img
                  src={img}
                  alt={`Galeria Leal ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            ),
          )}
        </div>
        <div className="mt-8 text-center">
          <a href={INSTAGRAM} target="_blank" rel="noopener" className="btn-outline">
            <InstagramIcon /> Ver mais no Instagram
          </a>
        </div>
      </section>

      {/* CTA forte */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, var(--brand-blue) 0%, var(--brand-red) 55%, var(--brand-yellow) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="bg-confetti absolute inset-0 opacity-25" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
          <h2 className="font-display text-3xl leading-tight text-white text-stroke-white md:text-5xl">
            Vai fazer uma festa? A diversão começa com a Leal!
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold text-white/95">
            Consulte agora a disponibilidade dos brinquedos e garanta uma festa mais divertida, segura e inesquecível.
          </p>
          <a
            href={WA_1}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-display text-lg font-bold text-brand-red shadow-2xl transition-transform hover:-translate-y-1"
          >
            <WhatsAppIcon className="h-6 w-6" /> Fazer orçamento pelo WhatsApp
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-20">
        <div className="text-center">
          <span className="inline-block rounded-full bg-brand-green/15 px-4 py-1 text-sm font-bold text-brand-green">
            Dúvidas frequentes
          </span>
          <h2 className="mt-3 font-display text-3xl text-brand-blue-dark md:text-5xl">Tudo o que você precisa saber</h2>
        </div>
        <div className="mt-10 space-y-3">
          {faq.map((item, i) => {
            const open = openFaq === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border-2 border-border bg-white shadow-sm transition-all"
              >
                <button
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpenFaq(open ? null : i)}
                  aria-expanded={open}
                >
                  <span className="font-display text-lg text-brand-blue-dark">{item.q}</span>
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white transition-transform"
                    style={{
                      background: "var(--brand-red)",
                      transform: open ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                {open && <div className="px-5 pb-5 text-foreground/75">{item.a}</div>}
              </div>
            );
          })}
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center md:px-6">
          <span className="inline-block rounded-full bg-brand-red/10 px-4 py-1 text-sm font-bold text-brand-red">
            Contato
          </span>
          <h2 className="mt-3 font-display text-3xl text-brand-blue-dark md:text-5xl">
            Fale com a Leal Locação de Brinquedos
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-foreground/75">
            Estamos prontos para ajudar você a escolher os brinquedos ideais para sua festa.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <a
              href={WA_1}
              target="_blank"
              rel="noopener"
              className="group flex flex-col items-center rounded-3xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-2xl text-white"
                style={{ background: "var(--whatsapp)" }}
              >
                <WhatsAppIcon className="h-7 w-7" />
              </span>
              <p className="mt-4 text-sm text-foreground/60">WhatsApp 1</p>
              <p className="mt-1 font-display text-xl text-brand-blue-dark">21 99617-8608</p>
              <span className="btn-primary mt-4 w-full">Chamar agora</span>
            </a>

            <a
              href={WA_2}
              target="_blank"
              rel="noopener"
              className="group flex flex-col items-center rounded-3xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-2xl text-white"
                style={{ background: "var(--whatsapp)" }}
              >
                <WhatsAppIcon className="h-7 w-7" />
              </span>
              <p className="mt-4 text-sm text-foreground/60">WhatsApp 2</p>
              <p className="mt-1 font-display text-xl text-brand-blue-dark">21 9649-83378</p>
              <span className="btn-primary mt-4 w-full">Chamar agora</span>
            </a>

            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener"
              className="group flex flex-col items-center rounded-3xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-2xl text-white"
                style={{
                  background:
                    "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)",
                }}
              >
                <InstagramIcon className="h-7 w-7" />
              </span>
              <p className="mt-4 text-sm text-foreground/60">Instagram</p>
              <p className="mt-1 font-display text-xl text-brand-blue-dark">@leallocacaodebrinquedos</p>
              <span className="btn-outline mt-4 w-full">Abrir Instagram</span>
            </a>
          </div>

          <p className="mt-8 text-sm text-foreground/60">
            Site: www.leallocacaodebrinquedos.com.br
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "var(--brand-blue-dark)" }} className="text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3 md:px-6">
          <div>
            <img
              src={logoAsset.url}
              alt="Leal Locação de Brinquedos"
              className="h-20 w-auto rounded-2xl bg-white p-2"
            />
            <p className="mt-4 font-display text-xl">Leal Locação de Brinquedos</p>
            <p className="mt-1 text-white/80">A alegria da sua festa começa aqui!</p>
          </div>
          <div>
            <h3 className="font-display text-lg text-brand-yellow">Links rápidos</h3>
            <ul className="mt-4 space-y-2 text-white/85">
              <li><a href="#inicio" className="hover:text-brand-yellow">Início</a></li>
              <li><a href="#brinquedos" className="hover:text-brand-yellow">Brinquedos</a></li>
              <li><a href="#como-funciona" className="hover:text-brand-yellow">Como funciona</a></li>
              <li><a href="#contato" className="hover:text-brand-yellow">Contato</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-lg text-brand-yellow">Contato</h3>
            <ul className="mt-4 space-y-2 text-white/85">
              <li>
                <a href={WA_1} target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-brand-yellow">
                  <WhatsAppIcon className="h-4 w-4" /> 21 99617-8608
                </a>
              </li>
              <li>
                <a href={WA_2} target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-brand-yellow">
                  <WhatsAppIcon className="h-4 w-4" /> 21 9649-83378
                </a>
              </li>
              <li>
                <a href={INSTAGRAM} target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-brand-yellow">
                  <InstagramIcon className="h-4 w-4" /> @leallocacaodebrinquedos
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/15">
          <p className="mx-auto max-w-7xl px-4 py-5 text-center text-sm text-white/70 md:px-6">
            © 2026 Leal Locação de Brinquedos. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={WA_1}
        target="_blank"
        rel="noopener"
        aria-label="Reservar pelo WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center rounded-full text-white shadow-2xl transition-transform hover:scale-110"
        style={{ background: "var(--whatsapp)" }}
      >
        <span
          className="absolute inset-0 animate-ping rounded-full opacity-30"
          style={{ background: "var(--whatsapp)" }}
          aria-hidden="true"
        />
        <WhatsAppIcon className="relative h-8 w-8" />
      </a>
    </div>
  );
}
