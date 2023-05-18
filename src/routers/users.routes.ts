import { Router } from 'express';
import ensureBodyIsValidMiddleware from '../middlewares/ensureBodyIsValid';
import { userRequestSchema, userUpdateSchema } from '../schemas/users.schemas';
import {
  createUsersController,
  deleteUserController,
  getUserInfosController,
  getUsersController,
  recoverUserController,
  updateUserController,
} from '../controllers/users.controllers';
import ensureEmailExistsMiddleware from '../middlewares/ensureEmailExists';
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValid.middleware';
import ensureUserIsAdminMiddleware from '../middlewares/ensureUserIsAdmin.middleware';
import ensureUserIdExistsMiddleware from '../middlewares/ensureUserIdExists.middleware';

const userRoutes: Router = Router();

userRoutes.post(
  '',
  ensureBodyIsValidMiddleware(userRequestSchema),
  ensureEmailExistsMiddleware,
  createUsersController
);

userRoutes.get(
  '',
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  getUsersController
);

userRoutes.get(
  '/profile',
  ensureTokenIsValidMiddleware,
  getUserInfosController
);

userRoutes.patch(
  '/:id',
  ensureUserIdExistsMiddleware,
  ensureBodyIsValidMiddleware(userUpdateSchema),
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  updateUserController
);

userRoutes.delete(
  '/:id',
  ensureUserIdExistsMiddleware,
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  deleteUserController
);

userRoutes.put(
  '/:id/recover',
  ensureUserIdExistsMiddleware,
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  recoverUserController
);

export default userRoutes;
