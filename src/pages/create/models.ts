import { z } from 'zod';

export const TagsEnum = z.enum([
  'PvM',
  'PvP',
  'Skilling',
  'Clue',
  'Minigame',
  'Quest',
  'Miscellaneous',
]);
export type Tags = z.infer<typeof TagsEnum>;

export const CreateSchema = z.object({
  icon: z.string().nonempty({ message: 'You must have an icon.' }),
  tagName: z.string().nonempty({ message: 'Tag name cannot be empty.' }),
  importString: z.string().min(1, { message: 'Import string cannot be empty.' }),
  // true/false value for layout nothing else
  layout: z.boolean(),
  tags: z
    .array(z.string())
    .min(1, { message: 'You must select at least one tag.' })
    .max(20, { message: 'You can select up to twenty tags.' }),
  likes: z.number().default(0),
});
export type CreateFormData = z.infer<typeof CreateSchema>;
