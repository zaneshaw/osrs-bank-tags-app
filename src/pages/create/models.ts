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
  iconId: z.string().nonempty({ message: 'You must have an icon.' }),
  tagName: z.string().nonempty({ message: 'Tag name cannot be empty.' }),
  importString: z.string().min(1, { message: 'Import string cannot be empty.' }),
  // true/false value for layout nothing else
  layout: z.boolean(),
  tags: z
    .array(TagsEnum)
    .min(1, { message: 'You must select at least one tag.' })
    .max(5, { message: 'You can select up to five tags.' }),
});
export type CreateFormData = z.infer<typeof CreateSchema>;
