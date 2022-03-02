import * as axios from "axios";
import { setAlert } from "./alert.action";
import {
  ADD_POST,
  GET_ALL_POST,
  POST_ERR,
  UPDATE_LIKE,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "../helper/type";

export const getAllPost = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/post");
      dispatch({
        type: GET_ALL_POST,
        payload: res.data,
      });
    } catch (err) {
      const errorResponse = err.response.data;
      dispatch(setAlert(errorResponse.error, "danger"));
      dispatch({
        type: POST_ERR,
      });
    }
  };
};

export const getPost = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/post/${id}`);
      dispatch({
        type: GET_POST,
        payload: res.data,
      });
    } catch (err) {
      const errorResponse = err.response.data;
      dispatch(setAlert(errorResponse.error, "danger"));
      dispatch({
        type: POST_ERR,
      });
    }
  };
};
export const addPost = (data) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(data);
      const res = await axios.post("/api/post", body, config);
      dispatch({
        type: ADD_POST,
        payload: res.data,
      });
    } catch (err) {
      const errorResponse = err.response.data;
      dispatch(setAlert(errorResponse.error, "danger"));
      dispatch({
        type: POST_ERR,
      });
    }
  };
};
export const LikePost = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/post/like/${id}`);
      //console.log(res.data);
      dispatch({
        type: UPDATE_LIKE,
        payload: res.data,
      });
    } catch (err) {
      const errorResponse = err.response.data;
      dispatch(setAlert(errorResponse.error, "danger"));
      dispatch({
        type: POST_ERR,
      });
    }
  };
};

export const UnlikePost = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/post/unlike/${id}`);
      dispatch({
        type: UPDATE_LIKE,
        payload: res.data,
      });
    } catch (err) {
      const errorResponse = err.response.data;
      dispatch(setAlert(errorResponse.error, "danger"));
      dispatch({
        type: POST_ERR,
      });
    }
  };
};

//
export const addComment = (comment, postId) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(comment);
      const res = await axios.post(
        `/api/post/comment/${postId}`,
        comment,
        config
      );
      console.log(res.data);
      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });
      dispatch(setAlert("Comment Added", "success"));
    } catch (err) {
      const errorResponse = err.response.data;
      dispatch(setAlert(errorResponse.error, "danger"));
      dispatch({
        type: POST_ERR,
      });
    }
  };
};
export const deleteComment = (postId, commentId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        `/api/post/comment/${postId}/${commentId}`
      );
      dispatch({
        type: REMOVE_COMMENT,
        payload: res.data,
      });
      dispatch(setAlert("remove comment", "success"));
    } catch (err) {
      const errorResponse = err.response.data;
      dispatch(setAlert(errorResponse.error, "danger"));
      dispatch({
        type: POST_ERR,
      });
    }
  };
};
