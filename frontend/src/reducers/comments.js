import {
  COMMENT_INITIAL_DATA,
  COMMENT_UP_VOTE,
  COMMENT_DOWN_VOTE,
  COMMENT_DELETE_VOTE,
  COMMENT_ADD,
  COMMENT_EDIT
} from "../actions/comments";

export function comments(state = [], action) {
  switch (action.type) {
    case COMMENT_INITIAL_DATA:
      return action.comments;
    case COMMENT_ADD:
      return {
        ...state,
        [action.comment.id]: action.comment
      };
    case COMMENT_EDIT:
      const [editKey] = Object.keys(state).filter(
        key => state[key].id === action.comment.id
      );

      return {
        ...state,
        [editKey]: {
          ...state[editKey],
          timestamp: action.comment.timestamp,
          body: action.comment.body
        }
      };
    case COMMENT_UP_VOTE:
      const [upKey] = Object.keys(state).filter(
        key => state[key].id === action.id
      );

      return {
        ...state,
        [upKey]: {
          ...state[upKey],
          voteScore: state[upKey].voteScore + 1
        }
      };
    case COMMENT_DOWN_VOTE:
      const [downKey] = Object.keys(state).filter(
        key => state[key].id === action.id
      );

      return {
        ...state,
        [downKey]: {
          ...state[downKey],
          voteScore: state[downKey].voteScore - 1
        }
      };
    case COMMENT_DELETE_VOTE:
      const [deleteKey] = Object.keys(state).filter(
        key => state[key].id === action.id
      );

      const { [deleteKey]: deletePost, ...newState } = state;

      return newState;
    default:
      return state;
  }
}
