const httpStatus = require("http-status");
const asyncHandle = require("../../helper/asyncHandler");
const ErrorResponse = require("../../helper/errorResponse");
const Post = require("./post.model");
const User = require("../user/user.model");

// @router POST api/posts
// @decs create post
// @access private
module.exports.createPost = asyncHandle(async (req, res, next) => {
  const newPost = {
    text: req.body.text,
    name: req.user.name,
    avatar: req.user.avatar,
    user: req.user._id,
  };
  const post = await Post.create(newPost);
  res.status(httpStatus.OK).json(post);
});

// @router GET api/posts
// @decs get all post
// @access private
module.exports.getAllPosts = asyncHandle(async (req, res, next) => {
  const post = await Post.find();
  res.status(httpStatus.OK).json(post);
});

// @router GET api/post/:id
// @decs get  post by ID
// @access private
module.exports.getPost = asyncHandle(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    throw new ErrorResponse("id post not invalid");
  }
  res.status(httpStatus.OK).json(post);
});

// @router DELETE api/post/:id
// @decs  delete post by ID
// @access private
module.exports.deletePost = asyncHandle(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    throw new ErrorResponse("can`t remove post with this is");
  }
  if (post.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ msg: "User not authorized" });
  }

  await post.remove();
  res.status(httpStatus.OK).json(post);
});

// @router PUT api/post/like/:id
// @decs Like a post
// @access private
module.exports.likePost = asyncHandle(async (req, res, next) => {
  var postId = req.params.id;
  var userId = req.user._id;

  const post = await Post.findById(req.params.id);

  if (!post) {
    throw new ErrorResponse("cant`t like with this post", 404);
  }
  const index = post.likes
    .map((like) => {
      return like.user.toString();
    })
    .indexOf(req.user._id.toString());

  if (index === -1) {
    post.likes.push({ user: req.user._id });
  }

  await post.save();
  res.status(200).send(post);
});

// @router PUT api/post/like/:id
// @decs UnLike a post
// @access private
module.exports.UnlikePost = asyncHandle(async (req, res, next) => {
  var postId = req.params.id;
  var userId = req.user._id;

  const post = await Post.findById(req.params.id);

  if (!post) {
    throw new ErrorResponse("cant`t unlike with this post");
  }

  const removeIndex = post.likes
    .map((like) => like.user.toString())
    .indexOf(req.user._id.toString());
  if (removeIndex !== -1) {
    post.likes.splice(removeIndex, 1);
  }

  await post.save();
  res.status(httpStatus.OK).json(post);
});

// @router POST api/post/comment/:id
// @decs create comment a post
// @access private
module.exports.createComment = asyncHandle(async (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.user._id;
  const user = await User.findById(userId);
  const post = await Post.findById(postId);
  console.log(user);
  if (!post || !user) {
    throw new ErrorResponse("cant`t create comment", 404);
  }
  const newComment = {
    text: req.body.text,
    name: user.name,
    avatar: user.avatar,
    user: req.user._id,
  };
  post.comments.unshift(newComment);
  await post.save();
  res.status(httpStatus.OK).json(post);
});
// @router DELETE api/post/comment/:id/:comment_id
// @decs delete comment a post
// @access private
module.exports.deleteComment = asyncHandle(async (req, res, next) => {
  const postId = req.params.id;

  const post = await Post.findById(postId);

  if (!post) {
    throw new ErrorResponse("postId incorrect", 404);
  }
  const comment = post.comments.find(
    (comment) => comment._id.toString() === req.params.comment_id
  );

  if (!comment) {
    throw new ErrorResponse("dosen`t existed comment", 404);
  }

  if (comment.user.toString() !== req.user._id.toString()) {
    throw new ErrorResponse("User not authorized", 404);
  }

  const removeIndex = post.comments
    .map((comment) => comment._id)
    .indexOf(req.params.id);
  post.comments.splice(removeIndex, 1);
  await post.save();
  res.status(200).send(post);
});
