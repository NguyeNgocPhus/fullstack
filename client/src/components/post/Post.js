import React, { useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllPost } from "../../actions/post.action";
import Spinder from "../layout/Spinder";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

function Post() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.post.loading);
  const posts = useSelector((state) => state.post.posts);
  useEffect(() => {
    dispatch(getAllPost());
  }, [dispatch]);
  return loading ? (
    <Spinder></Spinder>
  ) : (
    <Fragment>
      <div className="post bg-white p-1 my-1">Posts</div>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community
      </p>
      <PostForm></PostForm>
      {posts.length > 0 ? (
        <div className="posts">
          {posts.map((post) => {
            return <PostItem key={post._id} post={post}></PostItem>;
          })}
        </div>
      ) : (
        <h3>Not Found Posts</h3>
      )}
    </Fragment>
  );
}

export default Post;
