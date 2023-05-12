var https = require("https");
const fs = require("fs");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

// livereload
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var linkedinRouter = require("./routes/linkedin");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.use(connectLiveReload());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/linkedin", linkedinRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const options = {
  key: fs.readFileSync("certificates/server.key"),
  cert: fs.readFileSync("certificates/server.cert"),
};

https.createServer(options, app).listen(443, () => {
  console.log("Server started on https://localhost:443");
});

module.exports = app;
