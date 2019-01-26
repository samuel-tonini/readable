import React, { useEffect } from "react";
import { connect } from "react-redux";
import Comment from "./Comment";
import { handleCommentInitialData } from "../../actions/comments";

function CommentList({ dispatch, comments, postId }) {
  useEffect(() => {
    dispatch(handleCommentInitialData(postId));
  }, []);

  return Object.keys(comments).map(key => (
    <Comment key={comments[key].id} comment={comments[key]} />
  ));
}

const mapStateToProps = ({ comments }) => ({ comments });

export default connect(mapStateToProps)(CommentList);
