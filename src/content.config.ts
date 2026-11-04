import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const games = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/games'}),
    schema: ({ image }) =>
        z.object({
            name: z.string(),
            description: z.string(),
            image: image().optional(),  // TODO: make "image missing" placeholder in aseprite
            tags: z.array(z.string()).default([]),
            links: z.object({
                itch: z.url().optional(),
                github: z.url().optional(),
            }).default({}),
            order: z.int().default(100)  // todo: add merged ordering between games and projects
        })
})

export const collections = { games };