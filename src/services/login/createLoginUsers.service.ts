import { QueryConfig, QueryResult } from 'pg';
import { client } from '../../database';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import 'dotenv/config';
import { AppError } from '../../error';
import { TUser } from '../../interfaces/users.interfaces';
import {
  TUserLoginRequest,
  TUserToken,
} from '../../interfaces/login.interfaces';

const createLoginUsersService = async (
  userData: TUserLoginRequest
): Promise<TUserToken> => {
  const queryString: string = `
    SELECT 
      *
    FROM
      users
    WHERE
      email = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userData.email],
  };

  const queryResult: QueryResult<TUser> = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError('Wrong email/password', 401);
  }

  const user: TUser = queryResult.rows[0];

  const comparePass: boolean = await compare(userData.password, user.password);

  if (!comparePass || !user.active) {
    throw new AppError('Wrong email/password', 401);
  }

  const token: string = sign(
    {
      admin: user.admin,
    },
    String(process.env.SECRET_KEY),
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: String(user.id),
    }
  );

  return { token };
};

export default createLoginUsersService;
