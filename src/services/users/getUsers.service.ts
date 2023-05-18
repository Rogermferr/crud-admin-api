import { QueryResult } from 'pg';
import { TUserResponse } from '../../interfaces/users.interfaces';
import { client } from '../../database';
import { usersResponseSchema } from '../../schemas/users.schemas';

const getUsersService = async (): Promise<TUserResponse[]> => {
  const queryString: string = `
    SELECT
      *
    FROM
      users;
  `;

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryString
  );

  const users: TUserResponse[] = usersResponseSchema.parse(queryResult.rows);

  return users;
};

export default getUsersService;
