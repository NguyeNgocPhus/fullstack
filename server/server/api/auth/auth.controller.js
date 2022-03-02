const User = require("../user/user.model");
const asyncHandler = require("../../helper/asyncHandler");
const errorResponse = require("../../helper/errorResponse");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../../helper/errorResponse");
const config = require("../../../config/config");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
function successResponse(user, res) {
  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    config.jwtSecret
  );
  return res.status(httpStatus.OK).json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
}
// @router Post api/login
// @decs login user
// @access public
module.exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // Find user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ErrorResponse(`Không tồn tại tài khoản`, 401);
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    throw new ErrorResponse(`Sai mật khẩu`, 401);
  }
  return successResponse(user, res);
});
module.exports.getUser = asyncHandler(async (req, res, next) => {
  if (req.user) {
    res.status(httpStatus.OK).json({ user: req.user });
  } else {
    throw new ErrorResponse("something wrong", 500);
  }
});
module.exports.register = asyncHandler(async (req, res, next) => {
  const { name, password, email } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ErrorResponse("existed this email", 400);
  }
  const avatar = gravatar.url(email, {
    s: "200",
    r: "pg",
    d: "mm",
  });
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    avatar,
    email,
    password: hashPassword,
  });

  return successResponse(user, res);
});
