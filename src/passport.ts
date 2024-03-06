import passport from 'passport';
import LocalStrategy from 'passport-local';
import UsersService from './services/users.service';
import { verifyPassword } from './utils/password';
import type { User } from './entities/User.entity';

type PassportLocalContext = {
  usersService: UsersService,
}

type DoneFunction = (error: unknown, user?: User | boolean | number) => void;

class PassportLocal {
  private usersService: UsersService;

  constructor ({ usersService }: PassportLocalContext) {
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

  private createLocalStrategy (): LocalStrategy {
    return new LocalStrategy(
      { usernameField: 'name', passwordField: 'password' },
      this.verify.bind(this)
    );
  }

  private serializeUser (user: User, done: DoneFunction): void {
    done(null, user.id);
  }

  private async deserializeUser (userId: number, done: DoneFunction): Promise<void> {
    try {
      const user = await this.usersService.getBy({ id: userId });
      done(null, user);
    } catch (err) {
      done(err);
    }
  }

  public init (): void {
    const ls = this.createLocalStrategy();
    passport.use(ls);

    passport.serializeUser(this.serializeUser.bind(this));
    passport.deserializeUser(this.deserializeUser.bind(this));
  }
}

export default PassportLocal;
