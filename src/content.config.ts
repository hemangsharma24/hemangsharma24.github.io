import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    slug: z.string(),
    number: z.string(),
    type: z.array(z.string()),
    industry: z.string(),
    blurb: z.string(),
    theme: z.enum(["gintaa", "fnol", "bosch", "bolna"]),
    order: z.number(),
    category: z.string().optional(),
    stats: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  }),
});

export const collections = { projects };
