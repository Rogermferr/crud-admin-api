import { boolean, z } from 'zod';

const userLoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

const userTokenSchema = z.object({
  token: z.string(),
});

export { userLoginRequestSchema, userTokenSchema };
