import { QueryConfig, QueryResult } from 'pg';
import format from 'pg-format';
import { TUserResponse, TUserUpdate } from '../../interfaces/users.interfaces';
import { client } from '../../database';
import { userResponseSchema } from '../../schemas/users.schemas';

const updateUserService = async (
  id: number,
  userUpdateData: TUserUpdate
): Promise<TUserResponse> => {
  const queryString: string = format(
    `
      UPDATE
        users
      SET 
        (%I) = ROW(%L)
      WHERE
        id = $1
      RETURNING *;
    `,
    Object.keys(userUpdateData),
    Object.values(userUpdateData)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryConfig
  );

  const updatedUser: TUserResponse = userResponseSchema.parse(
    queryResult.rows[0]
  );

  return updatedUser;
};

export default updateUserService;
