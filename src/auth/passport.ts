import passport from 'passport';
import GoogleStrategy from './GoogleStrategy';
import LocalStrategy from './LocalStrategy';
import UsersService from '../services/users.service';
import type { User } from '../entities/User.entity';

type PassportLocalContext = {
  usersService: UsersService,
}

type DoneFunction = (error: unknown, user?: User | boolean | number) => void;

class PassportLocal {
  private usersService: UsersService;
  private localStrategy: LocalStrategy;
  private googleStrategy: GoogleStrategy;

  constructor ({ usersService }: PassportLocalContext) {
    this.usersService = usersService;
    this.localStrategy = new LocalStrategy({ usersService });
    this.googleStrategy = new GoogleStrategy({ usersService });
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
    const ls = this.localStrategy.createLocalStrategy();
    passport.use(ls);

    const gs = this.googleStrategy.createGoogleStrategy();
    passport.use(gs);

    passport.serializeUser(this.serializeUser.bind(this));
    passport.deserializeUser(this.deserializeUser.bind(this));
  }
}

export default PassportLocal;
