import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  CardContent,
  Divider,
  IconButton,
  CardActions
} from "@material-ui/core";
import { ThumbDown, ThumbUp, Delete } from "@material-ui/icons";
import {
  handleCommentDelete,
  handleCommentUpVote,
  handleCommentDownVote
} from "../../actions/comments";
import { postCommentDelete } from "../../actions/posts";

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit
  },
  actions: {
    display: "flex",
    paddingBottom: 0
  },
  badge: {
    margin: theme.spacing.unit * 2
  },
  deleteBtn: {
    marginLeft: "auto"
  }
});

function Comment({
  classes,
  dispatch,
  comment: { id, timestamp, body, author, voteScore, parentId }
}) {
  const horario = new Date(timestamp);
  return (
    <>
      <CardContent>
        <Divider />
        <Typography variant="subtitle2">{author}</Typography>
        <Typography paragraph variant="caption">
          {" em "}
          {("0" + horario.getDate()).slice(-2)}/
          {("0" + (horario.getMonth() + 1)).slice(-2)}/{horario.getFullYear()}{" "}
          {("0" + horario.getHours()).slice(-2)}:
          {("0" + horario.getMinutes()).slice(-2)}
          {" comentou:"}
        </Typography>
        <Typography variant="body1">{body}</Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <IconButton
          aria-label="Diminuir votação"
          onClick={e => {
            dispatch(handleCommentDownVote(id));
          }}
        >
          <ThumbDown />
        </IconButton>
        <Typography variant="subheading">{voteScore}</Typography>
        <IconButton
          aria-label="Aumentar votação"
          onClick={e => {
            dispatch(handleCommentUpVote(id));
          }}
        >
          <ThumbUp />
        </IconButton>
        <IconButton
          className={classes.deleteBtn}
          aria-label="Deletar comentário"
          onClick={e => {
            dispatch(handleCommentDelete(id));
            dispatch(postCommentDelete(parentId));
          }}
        >
          <Delete />
        </IconButton>
      </CardActions>
    </>
  );
}

export default connect()(withStyles(styles)(Comment));
