import axios from "axios";
import { setAlert } from "./alert.action";
import {
  PROFILE_ERROR,
  GET_PROFILE,
  UPDATE_PROFILE,
  GET_ALL_PROFILE,
} from "../helper/type";
export const getCurrentProfile = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/profile/me");
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    } catch (error) {
      const errorResponse = error.response.data;
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: errorResponse.error,
        },
      });
    }
  };
};

export const createProfile = (profile, naviage, edit = false) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    profile["skill"] = profile["skill"].toString();

    const body = JSON.stringify(profile);

    try {
      const res = await axios.post("/api/profile", body, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );

      if (!edit) {
        naviage("/dashboard");
      }
    } catch (error) {
      const errorResponse = error.response.data;
      dispatch(setAlert(errorResponse.error, "danger"));
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: errorResponse.error,
        },
      });
    }
  };
};
export const addExperience = (formData, naviage, edit = false) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(formData);

    try {
      const res = await axios.put("/api/profile/experience", body, config);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      dispatch(setAlert("Experience Add", "success"));

      naviage("/dashboard");
    } catch (error) {
      const errorResponse = error.response.data;
      dispatch(setAlert(errorResponse.error, "danger"));
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: errorResponse.error,
        },
      });
    }
  };
};
export const addEducation = (formData, naviage, edit = false) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(formData);

    try {
      const res = await axios.put("/api/profile/education", body, config);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      dispatch(setAlert("Education Add", "success"));

      naviage("/dashboard");
    } catch (error) {
      const errorResponse = error.response.data;
      dispatch(setAlert(errorResponse.error, "danger"));
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: errorResponse.error,
        },
      });
    }
  };
};
export const deleteExperience = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`/api/profile/experience/${id}`);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Experience Removed", "success"));
    } catch (error) {
      const errorResponse = error.response.data;
      dispatch(setAlert(errorResponse.error, "danger"));
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: errorResponse.error,
        },
      });
    }
  };
};
export const deleteEducation = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`/api/profile/education/${id}`);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Education Removed", "success"));
    } catch (error) {
      const errorResponse = error.response.data;
      dispatch(setAlert(errorResponse.error, "danger"));
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: errorResponse.error,
        },
      });
    }
  };
};
///get all profiles
export const getAllProfile = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/profile/all");
      dispatch({
        type: GET_ALL_PROFILE,
        payload: res.data,
      });
    } catch (error) {
      const errorResponse = error.response.data;
      dispatch(setAlert(errorResponse.error, "danger"));
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: errorResponse.error,
        },
      });
    }
  };
};
export const getProfileById = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/profile/user/${id}`);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    } catch (error) {
      const errorResponse = error.response.data;
      dispatch(setAlert(errorResponse.error, "danger"));
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: errorResponse.error,
        },
      });
    }
  };
};
