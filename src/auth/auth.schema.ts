import { z } from 'zod';

export const SchemaUserOAuth = z.object({
  sid: z.string(),
  given_name: z.string(),
  family_name: z.string(),
  nickname: z.string(),
  name: z.string(),
  picture: z.string(),
  updated_at: z.string(),
  email: z.string(),
  email_verified: z.boolean(),
  sub: z.string(),
});

export type UserOAuth = z.infer<typeof SchemaUserOAuth>;
