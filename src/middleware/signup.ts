import {NextFunction, Request, Response, Express} from 'express';
import { User } from '../db/model/user';


const isADuplicatedEmail = async(request: Request, response: Response, next: NextFunction) => {
  try {
    const { email = null } = request.body;
    const existingUser = await User.findOne({email});

    if (existingUser) {
      return response
              .status(403)
              .json({ message: `Fail! Email is already in use!` })
              .end();
    }

    next();
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
}

const isADuplicatedUsername = async(request: Request, response: Response, next: NextFunction) => {
  try {
    const { username = null } = request.body;

    const existingUser = await User.findOne({username});

    if (existingUser) {
      return response
              .status(400)
              .json({ message: `Fail! Username is already in use!` })
              .end();
    }

    next();
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
}

export default {isADuplicatedEmail, isADuplicatedUsername};