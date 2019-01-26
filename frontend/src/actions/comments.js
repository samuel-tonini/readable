import {
  getPostComment,
  voteComment,
  deleteComment,
  addComment,
  editComment
} from "../api/readable";

export const COMMENT_INITIAL_DATA = "COMMENT_INITIAL_DATA";
export const COMMENT_UP_VOTE = "COMMENT_UP_VOTE";
export const COMMENT_DOWN_VOTE = "COMMENT_DOWN_VOTE";
export const COMMENT_DELETE_VOTE = "COMMENT_DELETE_VOTE";
export const COMMENT_ADD = "COMMENT_ADD";
export const COMMENT_EDIT = "COMMENT_EDIT";

function commentInitialData(comments) {
  return {
    type: COMMENT_INITIAL_DATA,
    comments
  };
}

function commentAdd(comment) {
  return {
    type: COMMENT_ADD,
    comment
  };
}

function commentEdit(comment) {
  return {
    type: COMMENT_EDIT,
    comment
  };
}

function commentUpVote(id) {
  return {
    type: COMMENT_UP_VOTE,
    id
  };
}

function commentDownVote(id) {
  return {
    type: COMMENT_DOWN_VOTE,
    id
  };
}

function commentDelete(id) {
  return {
    type: COMMENT_DELETE_VOTE,
    id
  };
}

export function handleCommentInitialData(postId) {
  return dispatch => {
    return getPostComment(postId).then(res => {
      dispatch(commentInitialData(res));
    });
  };
}

export function handleCommentAdd(autor, texto, postId) {
  return dispatch => {
    return addComment(texto, autor, postId).then(res =>
      dispatch(
        commentAdd({
          id: res.id,
          timestamp: res.timestamp,
          body: texto,
          author: autor,
          voteScore: res.voteScore,
          deleted: res.deleted,
          commentCount: res.commentCount,
          parentId: res.parentId
        })
      )
    );
  };
}

export function handleCommentEdit(id, texto) {
  return dispatch => {
    return editComment(id, texto).then(res =>
      dispatch(
        commentEdit({
          id: id,
          timestamp: res.timestamp,
          body: texto
        })
      )
    );
  };
}

export function handleCommentUpVote(id) {
  return dispatch => {
    return voteComment(id, "upVote").then(dispatch(commentUpVote(id)));
  };
}

export function handleCommentDownVote(id) {
  return dispatch => {
    return voteComment(id, "downVote").then(dispatch(commentDownVote(id)));
  };
}

export function handleCommentDelete(id) {
  return dispatch => {
    return deleteComment(id).then(dispatch(commentDelete(id)));
  };
}
