import { Router } from 'express';
import { createLoginUSersController } from '../controllers/login.controllers';
import ensureBodyIsValidMiddleware from '../middlewares/ensureBodyIsValid';
import { userLoginRequestSchema } from '../schemas/login.schemas';

const loginRoutes: Router = Router();

loginRoutes.post(
  '',
  ensureBodyIsValidMiddleware(userLoginRequestSchema),
  createLoginUSersController
);

export default loginRoutes;
