const User = require("./user.model");
const asyncHandler = require("../../helper/asyncHandler");
const httpStatus = require("http-status");
const ErrorResponse = require("../../helper/errorResponse");

// @router Post api/users
// @decs Create user
// @access public
module.exports.createUser = asyncHandler(async (req, res, next) => {
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
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };
  const token = await jwt.sign(payload, process.env.secret, {
    expiresIn: 1000 * 60 * 60 * 24,
  });
  res.status(httpStatus.OK).json({
    token,
  });
});
