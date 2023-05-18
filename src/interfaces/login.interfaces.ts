import { z } from 'zod';
import {
  userLoginRequestSchema,
  userTokenSchema,
} from '../schemas/login.schemas';

type TUserLoginRequest = z.infer<typeof userLoginRequestSchema>;

type TUserToken = z.infer<typeof userTokenSchema>;

export { TUserLoginRequest, TUserToken };
