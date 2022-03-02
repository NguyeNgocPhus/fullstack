import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getPost } from "../../actions/post.action";
import Spinder from "../layout/Spinder";
import PostItem from "./PostItem";
import CommentForm from "../comment/CommentForm";
import CommentDetail from "../comment/CommentDetail";
function PostDetail() {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.post);
  const loading = useSelector((state) => state.post.loading);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  return loading || post === null ? (
    <Spinder></Spinder>
  ) : (
    <>
      <Link className="btn btn-light my-1" to="/posts">
        Back to Post
      </Link>
      <PostItem post={post}></PostItem>
      <CommentForm postId={id}></CommentForm>
      {post.comments.length > 0 ? (
        post.comments.map((comment) => {
          return (
            <CommentDetail
              key={comment._id}
              comment={comment}
              postId={post._id}
            ></CommentDetail>
          );
        })
      ) : (
        <p>Not comment</p>
      )}
    </>
  );
}

export default PostDetail;
