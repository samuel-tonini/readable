import React from "react";
import { TextInput } from "../../input";
import { useInput } from "../../hooks";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import { handleCommentAdd } from "../../actions/comments";
import { postCommentAdd } from "../../actions/posts";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  button: {
    margin: theme.spacing.unit
  }
});

function SimpleCommentEdit({ postId, classes, history, dispatch }) {
  const [autor, setAutorError, setAutor] = useInput("");
  const [texto, setTextoError, setTexto] = useInput("");

  const handleSubmit = e => {
    e.preventDefault();

    setAutorError(
      autor.value === "" ? "O autor do comentário deve ser preenchido!" : ""
    );
    setTextoError(
      texto.value === "" ? "O texto do comentário deve ser preenchido!" : ""
    );

    if (autor.value !== "" && texto.value !== "") {
      dispatch(handleCommentAdd(autor.value, texto.value, postId));
      dispatch(postCommentAdd(postId));
      setAutor("");
      setTexto("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Paper elevation={0} className={classes.paper}>
        <Typography variant="h6">Comentários</Typography>
        <div>
          <TextInput
            {...autor}
            label="Autor"
            placeholder="Autor do comentário"
          />
        </div>
        <div>
          <TextInput
            {...texto}
            label="Texto"
            placeholder="Texto do comentário"
            multiline
          />
        </div>
        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Salvar
          </Button>
        </div>
      </Paper>
    </form>
  );
}

export const CommentEdit = withRouter(
  connect()(withStyles(styles)(SimpleCommentEdit))
);
