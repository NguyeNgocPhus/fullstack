const express = require("express");
const { isAuthenticated } = require("../../middleware/authentication");
const postController = require("./post.controller");
const router = express.Router();

router.get("/", isAuthenticated(), postController.getAllPosts);
router.get("/:id", isAuthenticated(), postController.getPost);
router.post("/", isAuthenticated(), postController.createPost);
router.put("/like/:id", isAuthenticated(), postController.likePost);
router.put("/unlike/:id", isAuthenticated(), postController.UnlikePost);
router.post(
  "/comment/:postId",
  isAuthenticated(),
  postController.createComment
);

module.exports = router;
