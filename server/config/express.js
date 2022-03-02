const express = require("express");
const logger = require("morgan");
const config = require("./config");
const expressValidation = require("express-validation");
const bearerToken = require("express-bearer-token");
const cookieParser = require("cookie-parser");
const routes = require("../index.router");
const errorHandle = require("../server/middleware/errorHandler");
const ErrorResponse = require("../server/helper/errorResponse");
const app = express();
if (config.env === "development") {
  app.use(logger("dev"));
}
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(bearerToken());
app.use("/api", routes);
app.use(function (err, req, res, next) {
  if (err instanceof expressValidation.ValidationError) {
    const unifiedErrorMessage = err.details.body.map(
      (error) => error.message
    )[0];
    const error = new ErrorResponse(unifiedErrorMessage, 404);
    next(error);
  } else {
    next(err);
  }
});

app.use(errorHandle);

module.exports = app;
