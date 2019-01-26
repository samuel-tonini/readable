import React, { useState } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  CardContent,
  Divider,
  IconButton,
  CardActions,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent
} from "@material-ui/core";
import { ThumbDown, ThumbUp, Delete, Edit } from "@material-ui/icons";
import {
  handleCommentDelete,
  handleCommentUpVote,
  handleCommentDownVote,
  handleCommentEdit
} from "../../actions/comments";
import { postCommentDelete } from "../../actions/posts";
import { TextInput } from "../../input";
import { useInput } from "../../hooks";

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

function SimpleDialog({ onClose, comment, open }) {
  const [texto] = useInput(comment);

  return (
    <Dialog open={open} aria-labelledby="simple-dialog-title">
      <DialogTitle id="simple-dialog-title">Edição de Comentário</DialogTitle>
      <DialogContent>
        <TextInput
          {...texto}
          label="Texto"
          placeholder="Texto do comentário"
          multiline
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose("");
          }}
          color="primary"
        >
          Cancelar
        </Button>
        <Button
          onClick={() => {
            onClose(texto.value);
          }}
          color="primary"
          autoFocus
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function Comment({
  classes,
  dispatch,
  comment: { id, timestamp, body, author, voteScore, parentId }
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = comentario => {
    setIsOpen(false);
    if (comentario) dispatch(handleCommentEdit(id, comentario));
  };

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
          onClick={() => {
            dispatch(handleCommentUpVote(id));
          }}
        >
          <ThumbUp />
        </IconButton>
        <IconButton
          aria-label="Editar comentário"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <Edit />
        </IconButton>
        <IconButton
          className={classes.deleteBtn}
          aria-label="Deletar comentário"
          onClick={() => {
            dispatch(handleCommentDelete(id));
            dispatch(postCommentDelete(parentId));
          }}
        >
          <Delete />
        </IconButton>
      </CardActions>
      <SimpleDialog comment={body} open={isOpen} onClose={handleCloseModal} />
    </>
  );
}

export default connect()(withStyles(styles)(Comment));
