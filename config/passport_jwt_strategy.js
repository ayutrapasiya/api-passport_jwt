const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "testing",
};

const signUpModel = require("../models/signUp");

passport.use(
  new JwtStrategy(opts, async function (payload, done) {
    let checkUserData = await signUpModel.findOne({
      email: payload.userData.email,
    });

    if (checkUserData) {
      return done(null, checkUserData);
    } else {
      return done(null, false);
    }
  })
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  let userData = await signUpModel.findById(id);
  if (userData) {
    return done(null, userData);
  } else {
    return done(null, false);
  }
});

module.exports = passport;
