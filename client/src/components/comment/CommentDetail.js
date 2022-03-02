import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Momment from "react-moment";

const CommentDetail = (props) => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${props.comment.user}`}>
          <img className="round-img" src={props.comment.avatar} alt="" />
          <h4>{props.comment.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{props.comment.text}</p>
        <p className="post-date">
          Posted on{" "}
          <Momment format="DD/MM/YYYY">{props.comment.createdAt}</Momment>
        </p>
        {!loading && user._id.toString() === props.comment.user.toString() && (
          <button className="btn btn-danger">
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentDetail;
