import { z } from 'zod';

export const SchemaMessage = z.object({
  content: z.string(),
  sid: z.string(),
  id: z.string(),
  created_at: z.date(),
  id_room: z.string(),
});

export type ModelMessage = z.infer<typeof SchemaMessage>;

export const SchemaParamsApiMessageCreate = z.object({
  id_room: z.string(),
  content: z.string(),
  sid: z.string(),
});

export type ParamsApiMessageCreate = z.infer<typeof SchemaParamsApiMessageCreate>;
