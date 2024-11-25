import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as FbStrategy } from "passport-facebook";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
  });


passport.serializeUser((user, done)=>{
    done(null, user)
})
passport.deserializeUser(function(user, done){
    done(null, user)
})

passport.use(new GoogleStrategy({
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:`http://localhost:${process.env.PORT}/auth/google/cb`,
    passReqToCallback:true
},
function(req, accTkn, rfrTkn, profile, done){
    return done(null, profile)
}))

passport.use(new FbStrategy({
    clientID:process.env.FB_CLIENT_ID,
    clientSecret:process.env.FB_CLIENT_SECRET,
    callbackURL:`http://localhost:${process.env.PORT}/auth/fb/cb`,
    profileFields:['id', 'displayName', 'email']
},
function(accTkn, rfrTkn, profile, done){
    return done(null, profile)
}))
