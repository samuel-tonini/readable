import React from "react";
import { connect } from "react-redux";
import { ThumbDown, ThumbUp, Message, Delete } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import {
  CardHeader,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Badge,
  Divider
} from "@material-ui/core";
import {
  handlePostUpVote,
  handlePostDownVote,
  handlePostDelete
} from "../../actions/posts";
import { Link } from "react-router-dom";
import CommentList from "../comment/CommentList";
import { CommentEdit } from "../comment/CommentEdit";

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit
  },
  actions: {
    display: "flex"
  },
  badge: {
    margin: theme.spacing.unit * 2
  },
  deleteBtn: {
    marginLeft: "auto"
  }
});

function SimplePost({
  classes,
  post: {
    id,
    title,
    author,
    timestamp,
    category,
    body,
    voteScore,
    commentCount
  },
  dispatch,
  edit
}) {
  const horario = new Date(timestamp);
  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/${category}/${id}`}
          >
            {title}
          </Link>
        }
        subheader={`Postado por ${author} em ${("0" + horario.getDate()).slice(
          -2
        )}/${("0" + (horario.getMonth() + 1)).slice(
          -2
        )}/${horario.getFullYear()} ${("0" + horario.getHours()).slice(-2)}:${(
          "0" + horario.getMinutes()
        ).slice(-2)} em ${category}`}
      />
      <CardContent>
        <Typography component="p">{body}</Typography>
      </CardContent>
      <CardActions className={classes.actions} disableActionSpacing>
        <IconButton
          aria-label="Diminuir votação"
          onClick={e => {
            dispatch(handlePostDownVote(id));
          }}
        >
          <ThumbDown />
        </IconButton>
        <Typography variant="subheading">{voteScore}</Typography>
        <IconButton
          aria-label="Aumentar votação"
          onClick={e => {
            dispatch(handlePostUpVote(id));
          }}
        >
          <ThumbUp />
        </IconButton>
        {!edit && (
          <Badge
            className={classes.badge}
            badgeContent={commentCount}
            color="secondary"
          >
            <Message color="action" />
          </Badge>
        )}
        <IconButton
          className={classes.deleteBtn}
          aria-label="Deletar post"
          onClick={e => {
            dispatch(handlePostDelete(id));
          }}
        >
          <Delete />
        </IconButton>
      </CardActions>
      {edit && (
        <>
          <Divider />
          <CommentEdit postId={id} />
          <CommentList postId={id} />
        </>
      )}
    </Card>
  );
}

export const Post = connect()(withStyles(styles)(SimplePost));
