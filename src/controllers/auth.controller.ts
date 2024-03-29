import { Request, Response } from 'express';

import type UsersService from '../services/users.service';
import { generatePassword } from '../utils/password';

type AuthControllerContext = {
  usersService: UsersService,
}

class AuthController {
  private usersService: UsersService;

  constructor ({ usersService } : AuthControllerContext) {
    this.usersService = usersService;
  }

  public loginWithCredentials (_req: Request, res: Response) {
    return res.status(200).end();
  }

  public async signupWithCredentials (req: Request, res: Response) {
    const passwordValues = generatePassword(req.body.password);
    try {
      const { salt, hash, ...user } = await this.usersService.create({
        ...req.body,
        salt: passwordValues.salt,
        hash: passwordValues.hash,
      });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  public logoutWithCredentials (req: Request, res: Response) {
    req.logout(function(err) {
      if (err) {
        return res.status(400).json({ error: 'Error occurred.' });
      } else {
        res.status(200).end();
      }
    });
  }

  public googleCallback (_req: Request, res: Response) {
    return res.status(200).end();
  }
}

export default AuthController;
