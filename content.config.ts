import { defineContentConfig, defineCollection, z } from "@nuxt/content";
import { asOgImageCollection } from "nuxt-og-image/content";

export default defineContentConfig({
  collections: {
    content: defineCollection(
      asOgImageCollection({
        type: "page",
        source: "**/*.md",
        schema: z.object({
          date: z.string(),
          tags: z.array(z.string()),
          image: z.string(),
        }),
      })
    ),
  },
});
