import { QueryConfig, QueryResult } from 'pg';
import { client } from '../../database';
import { TUserResponse } from '../../interfaces/users.interfaces';
import { userResponseSchema } from '../../schemas/users.schemas';
import { AppError } from '../../error';

const recoverUserService = async (id: number): Promise<TUserResponse> => {
  const queryStringSelect: string = `
    SELECT
      *
    FROM
      users
    WHERE
      id = $1;
  `;

  const queryConfigSelect: QueryConfig = {
    text: queryStringSelect,
    values: [id],
  };

  const queryResultSelect: QueryResult<TUserResponse> = await client.query(
    queryConfigSelect
  );

  const active: boolean = queryResultSelect.rows[0].active;

  if (active) {
    throw new AppError('User already active', 400);
  }

  const queryString: string = `
      UPDATE
        users
      SET 
        active = true
      WHERE
        id = $1
      RETURNING *;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryConfig
  );

  const userRecovered: TUserResponse = userResponseSchema.parse(
    queryResult.rows[0]
  );

  return userRecovered;
};

export default recoverUserService;
