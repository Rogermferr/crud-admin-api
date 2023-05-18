import { NextFunction, Request, Response } from 'express';
import { QueryConfig, QueryResult } from 'pg';
import { TUserResponse } from '../interfaces/users.interfaces';
import { client } from '../database';
import { AppError } from '../error';

const ensureUserIdExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = Number(req.params.id);

  const queryString: string = `
    SELECT 
      *
    FROM
      users
    WHERE
      id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryConfig
  );

  if (queryResult.rowCount === 0) {
    throw new AppError('User not found', 404);
  }

  return next();
};

export default ensureUserIdExistsMiddleware;
