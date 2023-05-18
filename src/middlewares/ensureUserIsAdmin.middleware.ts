import { NextFunction, Request, Response } from 'express';
import { AppError } from '../error';

const ensureUserIsAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const user: any = res.locals.user;
  const id: number = Number(req.params.id);

  if (!user.admin && req.method === 'PUT') {
    throw new AppError('Insufficient Permission', 403);
  }

  if (!user.admin && id !== Number(user.sub)) {
    throw new AppError('Insufficient Permission', 403);
  }

  return next();
};

export default ensureUserIsAdminMiddleware;
