import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import { useDispatch, useSelector } from "react-redux";
import { LikePost, UnlikePost } from "../../actions/post.action";

function PostItem(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const authLoading = useSelector((state) => state.auth.loading);

  return (
    <>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${props.post.user}`}>
            <img className="round-img" src={props.post.avatar} alt="" />
            <h4>{props.post.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{props.post.text}</p>
          <p className="post-date">
            Posted on{" "}
            <Moment format="DD/MM/YYYY">{props.post.createdAt}</Moment>
          </p>
          <button
            type="button"
            className="btn btn-light"
            onClick={(e) => {
              dispatch(LikePost(props.post._id));
            }}
          >
            <i className="fas fa-thumbs-up"></i>
            {props.post.likes.length > 0 && (
              <span>{props.post.likes.length}</span>
            )}
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={(e) => {
              dispatch(UnlikePost(props.post._id));
            }}
          >
            <i className="fas fa-thumbs-down"></i>
          </button>
          <Link to={`/post/${props.post._id}`} className="btn btn-primary">
            Discussion
            {props.post.comments.length > 0 && (
              <span className="comment-count">
                {props.post.comments.length}
              </span>
            )}
          </Link>
          {!authLoading && user._id.toString() === props.post.user.toString() && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={(e) => {}}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default PostItem;
