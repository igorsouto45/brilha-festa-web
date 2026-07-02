import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  CONTENT_KEYS,
  defaultBrinquedos,
  defaultFaq,
  defaultGaleria,
  type BrinquedoItem,
  type FaqItem,
  type GaleriaContent,
} from "./site-content";

type ContentBundle = {
  brinquedos: BrinquedoItem[];
  galeria: GaleriaContent;
  faq: FaqItem[];
};

export function useSiteContent() {
  return useQuery<ContentBundle>({
    queryKey: ["site_content"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_content").select("section_key, data");
      if (error) throw error;
      const map = new Map((data ?? []).map((r) => [r.section_key, r.data as unknown]));
      return {
        brinquedos: (map.get(CONTENT_KEYS.brinquedos) as BrinquedoItem[] | undefined) ?? defaultBrinquedos,
        galeria: (map.get(CONTENT_KEYS.galeria) as GaleriaContent | undefined) ?? defaultGaleria,
        faq: (map.get(CONTENT_KEYS.faq) as FaqItem[] | undefined) ?? defaultFaq,
      };
    },
    staleTime: 30_000,
  });
}
