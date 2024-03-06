import { Request, Response, NextFunction } from 'express';

class AuthMiddleware {
  public isAuth (req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).json({ error: 'Not authenticated' });
    }
  }

  public checkLoginRequiredFields (req: Request, res: Response, next: NextFunction) {
    if (!req.body.password) {
      return res.status(404).json({ error: 'Password is required.' });
    }
    if (!req.body.name) {
      return res.status(404).json({ error: 'Name is required.' });
    }
    next();
  }

  public checkSignupRequiredFields (req: Request, res: Response, next: NextFunction) {
    if (!req.body.password) {
      return res.status(404).json({ error: 'Password is required.' });
    }
    if (!req.body.name) {
      return res.status(404).json({ error: 'Name is required.' });
    }
    if (!req.body.email || !req.body.timezone) {
      return res.status(404).json({ error: 'Missing required property.' });
    }
    next();
  }
}

export default AuthMiddleware;
