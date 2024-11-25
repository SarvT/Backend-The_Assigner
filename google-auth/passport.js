import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as FbStrategy } from "passport-facebook";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

//defining serializer
passport.serializeUser((user, done) => {
  done(null, user);
});
//defining deserializer
passport.deserializeUser(function (user, done) {
  done(null, user);
});

// configuring passport for Google auth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}:${process.env.PORT}${process.env.CALLBACK_PATH_GOOGLE}`,
      passReqToCallback: true,
    },
    function (req, accTkn, rfrTkn, profile, done) {
      return done(null, profile);
    }
  )
);

// configuring passport for Facebook auth
passport.use(
  new FbStrategy(
    {
      clientID: process.env.FB_CLIENT_ID,
      clientSecret: process.env.FB_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}:${process.env.PORT}${process.env.CALLBACK_PATH_FB}`,
      profileFields: ["id", "displayName", "email"],
    },
    function (accTkn, rfrTkn, profile, done) {
      return done(null, profile);
    }
  )
);
