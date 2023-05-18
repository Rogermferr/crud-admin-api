import { NextFunction, Request, Response } from 'express';
import { AppError } from '../error';
import { verify } from 'jsonwebtoken';

const ensureTokenIsValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  let token: string | undefined = req.headers.authorization;

  if (!token) {
    throw new AppError('Missing Bearer Token', 401);
  }

  token = token.split(' ')[1];

  verify(token, String(process.env.SECRET_KEY), (err: any, decoded: any) => {
    if (err) {
      throw new AppError(err.message, 401);
    }

    res.locals.user = decoded;
  });

  return next();
};

export default ensureTokenIsValidMiddleware;
