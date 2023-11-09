import { Request, Response } from 'express';
import crypto from 'crypto';
import { User } from '../db/model/user';
import { generateToken } from '../lib/auth';

const signup = async (request: Request, response: Response) => {
  try {
    const { email = null, password = null, username = null } = request.body;
    if ([email, password, username].includes(null)) {
      return response.sendStatus(400);
    }

    const existingUser = await User.findOne({email});

    if (existingUser) {
      return response.sendStatus(400);
    }

    const salt = crypto.randomBytes(128).toString('base64');
    const data = {
      email,
      username,
      authentication: {
        salt,
        password: generateToken(salt, password)
      }
    };

    const user = await new User(data)
                            .save()
                            .then((user) => user.toObject());

    return response.status(200).json(user).end();
  } catch (error) {
    return response.status(400).json(error).end();
  }
};

const signin = async (request: Request, response: Response) => {
  try {
    const { email = null, password = null } = request.body;
    if ([email, password].includes(null)) {
      return response.sendStatus(400);
    }

    const user = await User.findOne({email}).select('+authentication.salt +authentication.password');

    if (!user) {
      return response.sendStatus(400);
    }

    const saltedPassword = generateToken(user.authentication.salt, password);
    if (user.authentication.password !== saltedPassword) {
      return response.sendStatus(403);
    }

    const salt = crypto.randomBytes(128).toString('base64');


    user.authentication.sessionToken = generateToken(salt, user._id.toString());
    await user.save();

    response.cookie('AUTH-TOKEN', user.authentication.sessionToken, { domain: 'localhost', path: '/' });
    return response.status(200).json(user).end();
  } catch (error) {
    return response.status(400).json(error).end();
  }
};

export default {signup, signin};