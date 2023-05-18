import { Request, Response } from 'express';
import {
  TUserRequest,
  TUserResponse,
  TUserUpdate,
} from '../interfaces/users.interfaces';
import createUsersService from '../services/users/createUsers.service';
import getUsersService from '../services/users/getUsers.service';
import getUserInfosService from '../services/users/getUserInfos.service';
import updateUserService from '../services/users/updateUsers.service';
import deleteUserService from '../services/users/deleteUsers.service';
import recoverUserService from '../services/users/recoverUser.service';

const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserRequest = req.body;

  const newUser: TUserResponse = await createUsersService(userData);

  return res.status(201).json(newUser);
};

const getUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users: TUserResponse[] = await getUsersService();

  return res.json(users);
};

const getUserInfosController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = Number(res.locals.user.sub);

  const user: TUserResponse = await getUserInfosService(id);

  return res.json(user);
};

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = Number(req.params.id);
  const userUpdateData: TUserUpdate = req.body;

  const updatedUser: TUserResponse = await updateUserService(
    id,
    userUpdateData
  );

  return res.json(updatedUser);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = Number(req.params.id);

  deleteUserService(id);

  return res.status(204).send();
};

const recoverUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = Number(req.params.id);

  const userRecovered: TUserResponse = await recoverUserService(id);

  return res.json(userRecovered);
};

export {
  createUsersController,
  getUsersController,
  getUserInfosController,
  updateUserController,
  deleteUserController,
  recoverUserController,
};
