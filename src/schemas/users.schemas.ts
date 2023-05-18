import { boolean, z } from 'zod';

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
  admin: z.boolean().optional(),
  active: z.boolean(),
});

const userRequestSchema = userSchema.omit({ id: true, active: true });
const userResponseSchema = userSchema.omit({ password: true });

const usersResponseSchema = z.array(userResponseSchema);

const userUpdateSchema = userSchema
  .omit({ id: true, admin: true, active: true })
  .partial();

export {
  userSchema,
  userRequestSchema,
  userResponseSchema,
  usersResponseSchema,
  userUpdateSchema,
};
