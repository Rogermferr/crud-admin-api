import { Request, Response } from 'express';
import createLoginUsersService from '../services/login/createLoginUsers.service';
import { TUserToken } from '../interfaces/login.interfaces';

const createLoginUSersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token: TUserToken = await createLoginUsersService(req.body);

  return res.json(token);
};

export { createLoginUSersController };
