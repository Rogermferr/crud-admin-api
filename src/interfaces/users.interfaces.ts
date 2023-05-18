import { z } from 'zod';
import {
  userRequestSchema,
  userResponseSchema,
  userSchema,
  userUpdateSchema,
} from '../schemas/users.schemas';

type TUser = z.infer<typeof userSchema>;

type TUserRequest = z.infer<typeof userRequestSchema>;

type TUserResponse = z.infer<typeof userResponseSchema>;

type TUserUpdate = z.infer<typeof userUpdateSchema>;

export { TUser, TUserRequest, TUserResponse, TUserUpdate };
