import { addPost, votePost, deletePost } from "../api/readable";

export const POST_INITIAL_DATA = "POST_INITIAL_DATA";
export const POST_ADD = "POST_ADD";
export const POST_COMMENT_ADD = "POST_COMMENT_ADD";
export const POST_COMMENT_DELETE = "POST_COMMENT_DELETE";
export const POST_DELETE = "POST_DELETE";
export const POST_UP_VOTE = "POST_UP_VOTE";
export const POST_DOWN_VOTE = "POST_DOWN_VOTE";

export function postInitialData(posts) {
  return {
    type: POST_INITIAL_DATA,
    posts
  };
}

function postAdd(post) {
  return {
    type: POST_ADD,
    post
  };
}

export function postCommentAdd(id) {
  return {
    type: POST_COMMENT_ADD,
    id
  };
}

export function postCommentDelete(id) {
  return {
    type: POST_COMMENT_DELETE,
    id
  };
}

function postUpVote(id) {
  return {
    type: POST_UP_VOTE,
    id
  };
}

function postDownVote(id) {
  return {
    type: POST_DOWN_VOTE,
    id
  };
}

function postDelete(id) {
  return {
    type: POST_DELETE,
    id
  };
}

export function handlePostAdd(titulo, autor, categoria, texto) {
  return dispatch => {
    return addPost(titulo, texto, autor, categoria).then(res =>
      dispatch(
        postAdd({
          id: res.id,
          timestamp: res.timestamp,
          title: titulo,
          body: texto,
          author: autor,
          category: categoria,
          voteScore: res.voteScore,
          deleted: res.deleted,
          commentCount: res.commentCount
        })
      )
    );
  };
}

export function handlePostUpVote(id) {
  return dispatch => {
    return votePost(id, "upVote").then(dispatch(postUpVote(id)));
  };
}

export function handlePostDownVote(id) {
  return dispatch => {
    return votePost(id, "downVote").then(dispatch(postDownVote(id)));
  };
}

export function handlePostDelete(id) {
  return dispatch => {
    return deletePost(id).then(dispatch(postDelete(id)));
  };
}
