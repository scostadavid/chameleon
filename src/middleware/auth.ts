import {NextFunction, Request, Response, Express} from 'express';
import { User } from '../db/model/user';

const isAuthenticated = async(request: Request, response: Response, next: NextFunction) => {
  try {
    const sessionToken = request.cookies?.['AUTH-TOKEN'];
    if (!sessionToken) {
      return response.sendStatus(403);
    }

    const existingUser = await User.findOne({
      'authentication.sessionToken': sessionToken
    });

    if (!existingUser) {
      return response.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
}

const isOwner = async(request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const sessionToken = request.cookies?.['AUTH-TOKEN'];

    const existingUser = await User.findOne({
      'authentication.sessionToken': sessionToken
    });

    if (existingUser._id.toString() !== id) {
      return response.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
}

export default {isAuthenticated, isOwner};