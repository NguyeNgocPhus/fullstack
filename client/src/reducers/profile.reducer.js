import {
  CLEAR_PROFILE,
  GET_ALL_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from "../helper/type";

const initialState = {
  myprofile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        myprofile: payload,
        loading: false,
      };
    case GET_ALL_PROFILE:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        myprofile: null,
        loading: false,
        repos: [],
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        myprofile: null,
      };
    default:
      return state;
  }
};
export default profileReducer;
