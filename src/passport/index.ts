import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserService } from "../modules/user/User.service";
import { User } from "@prisma/client";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: process.env.SERVER_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await UserService.findBy("googleID", profile.id);

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await UserService.create({
          email: profile.emails![0].value,
          username: profile.displayName,
          googleID: profile.id,
          avatar: profile.photos![0].value,
        });

        return done(null, newUser);
      } catch (e: any) {
        done(e);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((userInfo: User, done) => {
  done(null, userInfo);
});

export { passport as myPassport };
