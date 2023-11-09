import { Request, Response, request } from 'express';
import { User } from '../db/model/user';

const index = async (request: Request, response: Response) => {
  try {
    const users = await User.find();
    return response.status(200).json(users);
  } catch(error) {
    console.log(error);
    return response.sendStatus(400);
  }
};

const destroy = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const user = await User.findOneAndDelete({ _id: id });
    return response.status(200).json(user);
  } catch(error) {
    console.log(error);
    return response.sendStatus(400);
  }
};

export default {index, destroy};
