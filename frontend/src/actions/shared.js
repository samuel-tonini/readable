import { getInitialData } from "../api/readable";
import { postInitialData } from "./posts";

export const SHARED_INITIAL_DATA = "INITIAL_DATA";

export function handleInitialData() {
  return dispatch => {
    return getInitialData().then(posts => {
      dispatch(postInitialData(posts));
    });
  };
}
