import { z } from 'zod';

export const CharacterApiSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.enum(['Alive', 'Dead', 'unknown']),
  species: z.string(),
  type: z.string(),
  gender: z.enum(['Female', 'Male', 'Genderless', 'unknown']),
  origin: z.object({
    name: z.string(),
    url: z.string(),
  }),
  location: z.object({
    name: z.string(),
    url: z.string(),
  }),
  image: z.string().url(),
  episode: z.array(z.string().url()),
  url: z.string().url(),
  created: z.string(),
});

export const PaginationInfoSchema = z.object({
  count: z.number(),
  pages: z.number(),
  next: z.string().url().nullable(),
  prev: z.string().url().nullable(),
});

export const ApiPayloadSchema = z.object({
  info: PaginationInfoSchema,
  results: z.array(CharacterApiSchema),
});

export type ApiPayload = z.infer<typeof ApiPayloadSchema>;
