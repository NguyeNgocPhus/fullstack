import * as axios from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  CLEAR_PROFILE,
} from "../helper/type";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert.action";

///LOAD USER
export const loadUser = () => {
  return async (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth/user");

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };
};

export const register = ({ name, email, password }, naviage) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password });
    try {
      const res = await axios.post("/api/auth/register", body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      naviage("/login");
    } catch (err) {
      const errorResponse = err.response.data;
      dispatch(setAlert(errorResponse.error, "danger"));
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
};

export const login = ({ email, password }) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post("/api/auth/login", body, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      const errorResponse = err.response.data;
      dispatch(setAlert(errorResponse.error, "danger"));
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
};
export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: LOGOUT_SUCCESS,
    });
    dispatch({
      type: CLEAR_PROFILE,
    });
    window.location.reload();
  };
};
