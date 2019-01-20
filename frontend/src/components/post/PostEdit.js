import React from "react";
import { TextInput, SelectInput } from "../../input";
import { useInput } from "../../hooks";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { handlePostAdd } from "../../actions/posts";

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

function SimplePostEdit({ classes, history, dispatch }) {
  const [titulo, setTituloError] = useInput("");
  const [autor, setAutorError] = useInput("");
  const [categoria, setCategoriaError] = useInput("");
  const [texto, setTextoError] = useInput("");

  const categorias = [
    {
      value: "react",
      label: "React"
    },
    {
      value: "redux",
      label: "Redux"
    },
    {
      value: "udacity",
      label: "Udacity"
    }
  ];

  const handleSubmit = e => {
    e.preventDefault();

    setTituloError(
      titulo.value === "" ? "O título do post deve ser preenchido!" : ""
    );
    setAutorError(
      autor.value === "" ? "O autor do post deve ser preenchido!" : ""
    );
    setCategoriaError(
      categoria.value === "" ? "A categoria do post deve ser preenchido!" : ""
    );
    setTextoError(
      texto.value === "" ? "O texto do post deve ser preenchido!" : ""
    );

    if (
      titulo.value !== "" &&
      autor.value !== "" &&
      categoria.value !== "" &&
      texto.value !== ""
    ) {
      dispatch(
        handlePostAdd(titulo.value, autor.value, categoria.value, texto.value)
      );
      history.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
          <Paper className={classes.paper}>
            <div>
              <TextInput
                {...titulo}
                label="Título"
                placeholder="Título do post"
              />
            </div>
            <div>
              <TextInput {...autor} label="Autor" placeholder="Autor do post" />
            </div>
            <div>
              <SelectInput
                {...categoria}
                options={categorias}
                label="Categoria"
              />
            </div>
            <div>
              <TextInput
                {...texto}
                label="Texto"
                placeholder="Texto do post"
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
              <Button
                onClick={() => {
                  history.push("/");
                }}
                color="primary"
                className={classes.button}
              >
                Cancelar
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
}

export const PostEdit = withRouter(
  connect()(withStyles(styles)(SimplePostEdit))
);