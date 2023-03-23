const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const dbconn = require("./dbconn");
const routes = require("./app/routes");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, "public")));
app.use(cors({ origin: "*" }));


// use routes
app.use("/", routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// db connection

dbconn
  .sync()
  .then(() => {
    console.log("table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

const port = process.env.PORT || 3000;
app.listen(port, async (err) => {
  if (err) throw err;
  else console.log(`server running on port ${port}`);
});

module.exports = app;
