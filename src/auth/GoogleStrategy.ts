import PassportGoogleStrategy from 'passport-google-oauth20';
import UsersService from '../services/users.service';
import type { DoneFunction } from '../types/shared';

type GoogleStrategyContext = {
  usersService: UsersService,
}

class GoogleStrategy {
  private usersService: UsersService;

  constructor ({ usersService }: GoogleStrategyContext) {
    this.usersService = usersService;
  }

  private async verify (
    _accessToken: string,
    _refreshToken: string,
    profile: { id: string, displayName: string },
    done: DoneFunction,
  ) {
    try {
      const user = await this.usersService.getBy({ googleId: profile.id });
      if (!user) {
        const newUser = await this.usersService.create({
          googleId: profile.id,
          name: profile.displayName,
        });
        return done(null, newUser);
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }

  public createGoogleStrategy (): PassportGoogleStrategy {
    return new PassportGoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/login/google/redirect',
      },
      this.verify.bind(this)
    );
  }
}

export default GoogleStrategy;
