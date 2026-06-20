

// 1. Import utilities from `astro:content`
import { defineCollection, reference, type SchemaContext } from 'astro:content';

// 2. Import loader(s)
import { glob, file } from 'astro/loaders';

// 3. Import Zod
import { z } from 'astro/zod';

// 4. Define a `loader` and `schema` for each collection
const blogCollection = defineCollection({
    loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
    schema: ({image}) => z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        slug: z.string().optional(),

        // Relación con otra colección
        // author: z.string(),
        author: reference('author'),

        // Relación
        image: image(),

        tags: z.array(z.string()),
        isDraft: z.boolean().default(false),
    }),
});

const authorCollection = defineCollection({
    loader: glob({ base: "./src/content/author", pattern: "**/*.yml"}),
    schema: ({ image }) => z.object({
        name: z.string(), 
        avatar: image(), 
        twitter: z.string(),
        linkedIn: z.string(),
        github: z.string(),
        bio: z.string(),
        subtitle: z.string(),
    }),
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { blog: blogCollection, author: authorCollection, };

// export const imageSchema = ({ image }: SchemaContext) => z.object({
//     schema: ({ image }) => z.object({
//         title: z.string(),
//         date: z.date(),
//         description: z.string(),
//         image: image(),
//     }),
// });
    // Relación      // author: z.string(),      author: reference("author"),
    // Relación      tags: z.array(z.string()),
    // Boolean      isDraft: z.boolean().default(false),    }),});
