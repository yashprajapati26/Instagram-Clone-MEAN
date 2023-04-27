const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: "bf1e52259ae3a7d530f6",
      clientSecret: "a96504634460e9e850ea10d51d14ea2f7628d360",
      callbackURL: "http://127.0.0.1:3000/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      cb(null, profile);
    }
  )
);

module.exports = {
  passport,
};
