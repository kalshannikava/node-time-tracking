import { Request, Response, NextFunction } from 'express';

class AuthMiddleware {
  public isAuth (req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).json({ error: 'Not authenticated' });
    }
  }
}

export default AuthMiddleware;
