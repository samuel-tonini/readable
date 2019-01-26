import {
  POST_INITIAL_DATA,
  POST_ADD,
  POST_UP_VOTE,
  POST_DOWN_VOTE,
  POST_DELETE,
  POST_COMMENT_ADD,
  POST_COMMENT_DELETE,
  POST_EDIT,
  POST_SORT
} from "../actions/posts";

export function posts(state = {}, action) {
  switch (action.type) {
    case POST_INITIAL_DATA:
      return { ...state, ...action.posts };
    case POST_ADD:
      return {
        ...state,
        [action.post.id]: action.post
      };
    case POST_EDIT:
      const [editKey] = Object.keys(state).filter(
        key => state[key].id === action.post.id
      );

      return {
        ...state,
        [editKey]: {
          ...state[editKey],
          ...action.post
        }
      };
    case POST_UP_VOTE:
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
    case POST_DOWN_VOTE:
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
    case POST_DELETE:
      const [deleteKey] = Object.keys(state).filter(
        key => state[key].id === action.id
      );

      const { [deleteKey]: deletePost, ...newState } = state;

      return newState;
    case POST_COMMENT_ADD:
      const [upCommentKey] = Object.keys(state).filter(
        key => state[key].id === action.id
      );

      return {
        ...state,
        [upCommentKey]: {
          ...state[upCommentKey],
          commentCount: state[upCommentKey].commentCount + 1
        }
      };
    case POST_COMMENT_DELETE:
      const [downCommentKey] = Object.keys(state).filter(
        key => state[key].id === action.id
      );

      return {
        ...state,
        [downCommentKey]: {
          ...state[downCommentKey],
          commentCount: state[downCommentKey].commentCount - 1
        }
      };
    case POST_SORT:
      if (action.classificacao === "crescente") {
        console.log("crescente");

        if (action.ordem === "data") {
          console.log("data");
          return {
            ...state,
            ...Object.values(state).sort(
              (a, b) =>
                a.timestamp > b.timestamp
                  ? 1
                  : b.timestamp > a.timestamp
                    ? -1
                    : 0
            )
          };
        } else {
          console.log("voteScore");
          return {
            ...state,
            ...Object.values(state).sort(
              (a, b) =>
                a.voteScore > b.voteScore
                  ? 1
                  : b.voteScore > a.voteScore
                    ? -1
                    : 0
            )
          };
        }
      } else {
        console.log("decrescente");
        if (action.ordem === "data") {
          console.log("data");
          return {
            ...state,
            ...Object.values(state).sort(
              (a, b) =>
                a.timestamp > b.timestamp
                  ? -1
                  : b.timestamp > a.timestamp
                    ? 1
                    : 0
            )
          };
        } else {
          console.log("voteScore");
          return {
            ...state,
            ...Object.values(state).sort(
              (a, b) =>
                a.voteScore > b.voteScore
                  ? -1
                  : b.voteScore > a.voteScore
                    ? 1
                    : 0
            )
          };
        }
      }
    default:
      return state;
  }
}
