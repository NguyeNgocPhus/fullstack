import {
  ADD_POST,
  GET_ALL_POST,
  UPDATE_LIKE,
  GET_POST,
  ADD_COMMENT,
} from "../helper/type";

const initialState = {
  post: null,
  posts: [],
  loading: true,
};

const postReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_POST:
      return {
        ...state,
        loading: false,
        posts: payload,
      };
    case UPDATE_LIKE:
      const newPosts = state.posts.map((post) => {
        if (post._id === payload._id) {
          post.likes = payload.likes;
        }
        return post;
      });
      //console.log(newPosts);
      return {
        ...state,
        posts: newPosts,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        loading: false,
        post: payload,
      };
    case ADD_POST:
      return {
        ...state,
        loading: false,
        post: payload,
        posts: [payload, ...state.posts],
      };
    case ADD_COMMENT:
      return {
        ...state,
        loading: false,
        post: payload,
        posts: [...state.posts, payload],
      };
    default:
      return state;
  }
};
export default postReducer;
