const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const config = require("../../config/config");
const User = require("../api/user/user.model");
const ErrorResponse = require("../helper/errorResponse");

function isAuthenticated() {
  return async (req, res, next) => {
    const BearerToken = req.headers.authorization;

    if (!req.headers.authorization) {
      return next(new ErrorResponse("bạn không có quyền truy câp", 500));
    }

    const token = BearerToken.split(" ")[1];
    jwt.verify(token, config.jwtSecret, async (err, data) => {
      if (err) return next(err);

      const filter = { password: 0, createdAt: 0, updatedAt: 0, playId: 0 };
      const user = await User.findById(data.id);

      if (user) {
        req.user = user;
        return next();
      }

      return res.status(httpStatus.UNAUTHORIZED).end();
    });
  };
}

module.exports = { isAuthenticated };
