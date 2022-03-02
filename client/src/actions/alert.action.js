import { SET_ALERT, REMOVE_ALERT } from "../helper/type";
import * as uuid from "uuid";
export const setAlert = (msg, alertType, timeOut = 3000) => {
  return (dispatch) => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: {
        msg,
        alertType,
        id,
      },
    });
    setTimeout(
      () =>
        dispatch({
          type: REMOVE_ALERT,
          payload: id,
        }),
      timeOut
    );
  };
};
