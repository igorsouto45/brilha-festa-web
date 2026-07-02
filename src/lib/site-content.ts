import pulaPulaImg from "@/assets/pula-pula.webp";
import tobogaImg from "@/assets/toboga.webp";
import camaElasticaImg from "@/assets/cama-elastica.webp";
import airHockeyImg from "@/assets/air-hockey.webp";
import futebolMesaImg from "@/assets/futebol-mesa.webp";
import piscinaBolinhasImg from "@/assets/piscina-bolinhas.webp";
import brinquedosInfantisImg from "@/assets/brinquedos-infantis.webp";

export type BrinquedoItem = { nome: string; desc: string };
export type FaqItem = { q: string; a: string };
export type GaleriaContent = { title: string; subtitle: string };

export const defaultBrinquedos: BrinquedoItem[] = [
  { nome: "Pula-pula", desc: "O clássico que não pode faltar em uma festa infantil. Diversão do começo ao fim." },
  { nome: "Tobogã Inflável", desc: "Grande, colorido e perfeito para deixar a criançada empolgada." },
  { nome: "Cama Elástica", desc: "Energia, movimento e muita diversão com segurança." },
  { nome: "Air Game", desc: "Uma opção divertida para crianças maiores, jovens e adultos." },
  { nome: "Futebol de Mesa", desc: "Competição saudável e diversão para todas as idades." },
  { nome: "Piscina de Bolinhas", desc: "Perfeita para os pequenos brincarem com conforto e alegria." },
  { nome: "Brinquedos Infantis", desc: "Opções variadas para complementar sua festa e encantar as crianças." },
];

export const brinquedoImages = [
  pulaPulaImg,
  tobogaImg,
  camaElasticaImg,
  airHockeyImg,
  futebolMesaImg,
  piscinaBolinhasImg,
  brinquedosInfantisImg,
];

export const defaultGaleria: GaleriaContent = {
  title: "Veja nossos brinquedos",
  subtitle: "",
};

export const defaultFaq: FaqItem[] = [
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

export const CONTENT_KEYS = {
  brinquedos: "brinquedos",
  galeria: "galeria",
  faq: "faq",
} as const;
