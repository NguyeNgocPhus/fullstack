const express = require("express");

const router = express.Router();
const userRouter = require("./server/api/user/user.router");
const authRouter = require("./server/api/auth/auth.router");
const profileRouter = require("./server/api/profile/profile.router");
const postRouter = require("./server/api/post/post.router");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/profile", profileRouter);
router.use("/post", postRouter);

module.exports = router;
