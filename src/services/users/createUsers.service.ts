import format from 'pg-format';
import { TUserRequest, TUserResponse } from '../../interfaces/users.interfaces';
import { QueryResult } from 'pg';
import { client } from '../../database';
import { userResponseSchema } from '../../schemas/users.schemas';
import { hash } from 'bcryptjs';

const createUsersService = async (
  userData: TUserRequest
): Promise<TUserResponse> => {
  const newUserData: TUserRequest = {
    ...userData,
    password: await hash(userData.password, 10),
  };

  const queryString: string = format(
    `
        INSERT INTO
          users
          (%I)
        VALUES
          (%L)
        RETURNING *;
    `,
    Object.keys(newUserData),
    Object.values(newUserData)
  );

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryString
  );

  const newUser: TUserResponse = userResponseSchema.parse(queryResult.rows[0]);

  return newUser;
};

export default createUsersService;
