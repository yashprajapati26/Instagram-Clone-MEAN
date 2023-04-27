const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const routes = require("./app/routes");
const cors = require("cors");
const app = express();
var passport = require("passport");
var flash = require("connect-flash");
const session = require("express-session");

require("dotenv").config();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(cors({ origin: "*" }));

app.use(session({ secret: "melody hensley is my spirit animal" }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// use routes
app.use("/", cors(), routes);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

const port = process.env.PORT || 3000;
app.listen(port, async (err) => {
  if (err) throw err;
  else console.log(`server running on port ${port}`);
});

module.exports = app;
