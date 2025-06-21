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
    jobs: defineCollection({
      type: "data",
      source: "1.jobs/**.json",
      schema: z.object({
        lang: z.string(),
        jobTitle: z.string(),
        company: z.string(),
        description: z.string(),
        start: z.string(),
        end: z.string(),
      }),
    }),
    education: defineCollection({
      type: "data",
      source: "2.education/**.json",
      schema: z.object({
        lang: z.string(),
        university: z.string(),
        course: z.string(),
        description: z.string(),
        start: z.string(),
        end: z.string(),
      }),
    }),
  },
});
