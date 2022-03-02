import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addComment } from "../../actions/post.action";

const CommentForm = ({ postId }) => {
  const [text, setText] = useState();
  const dispatch = useDispatch();
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <Link to="/posts">Leave A Comment</Link>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addComment({ text: text }, postId));
          setText("");
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment on this post"
          required
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default CommentForm;
