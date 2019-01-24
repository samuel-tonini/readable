export const CATEGORY_INITIAL_DATA = "CATEGORY_INITIAL_DATA";

export function categoryInitialData(categories) {
  return {
    type: CATEGORY_INITIAL_DATA,
    categories
  }
}