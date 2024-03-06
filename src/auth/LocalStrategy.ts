import PassportLocalStrategy from 'passport-local';
import UsersService from '../services/users.service';
import { verifyPassword } from '../utils/password';
import type { DoneFunction } from '../types/shared';

type LocalStrategyContext = {
  usersService: UsersService,
}

class LocalStrategy {
  private usersService: UsersService;

  constructor ({ usersService }: LocalStrategyContext) {
    this.usersService = usersService;
  }

  private async verify (username: string, password: string, done: DoneFunction): Promise<void> {
    try {
      const user = await this.usersService.getBy({ name: username });
      if (!user) {
        return done(null, false);
      }
      if (!verifyPassword(password, user.hash, user.salt)) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }

  public createLocalStrategy (): PassportLocalStrategy {
    return new PassportLocalStrategy(
      { usernameField: 'name', passwordField: 'password' },
      this.verify.bind(this)
    );
  }
}

export default LocalStrategy;
