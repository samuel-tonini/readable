import { CATEGORY_INITIAL_DATA } from "../actions/categories";

export function categories(state = {}, action) {
  switch (action.type) {
    case CATEGORY_INITIAL_DATA:
      return { ...state, ...action.categories };
    default:
      return state;
  }
}
