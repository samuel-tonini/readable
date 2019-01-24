import { getInitialData } from "../api/readable";
import { postInitialData } from "./posts";
import { categoryInitialData } from "./categories";

export const SHARED_INITIAL_DATA = "INITIAL_DATA";

export function handleInitialData() {
  return dispatch => {
    return getInitialData().then(({ posts, categories }) => {
      dispatch(postInitialData(posts));
      dispatch(categoryInitialData(categories));
    });
  };
}
