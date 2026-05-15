import { z } from 'zod';

export const selectedElementSchema = z.object({
  tagName: z.string(),
  id: z.string().nullable(),
  className: z.string().nullable(),
  boundingRect: z.object({
    top: z.number(),
    left: z.number(),
    width: z.number(),
    height: z.number(),
  }),
  ariaAttributes: z.record(z.string(), z.string()),
  innerHTML: z.string().max(500),
});

export type SelectedElementData = z.infer<typeof selectedElementSchema>;
