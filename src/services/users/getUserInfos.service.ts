import { QueryConfig, QueryResult } from 'pg';
import { TUserResponse } from '../../interfaces/users.interfaces';
import { client } from '../../database';
import { userResponseSchema } from '../../schemas/users.schemas';

const getUserInfosService = async (id: number): Promise<TUserResponse> => {
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

  const user: TUserResponse = userResponseSchema.parse(queryResult.rows[0]);

  return user;
};

export default getUserInfosService;
