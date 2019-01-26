import React, { useEffect } from "react";
import { TextInput, SelectInput } from "../../input";
import { useInput } from "../../hooks";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { handlePostAdd, handlePostEdit } from "../../actions/posts";

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

function SimplePostEdit({
  classes,
  history,
  dispatch,
  categories: categorias,
  post = []
}) {
  const [titulo, setTituloError, setTitulo] = useInput("");
  const [autor, setAutorError, setAutor] = useInput("");
  const [categoria, setCategoriaError, setCategoria] = useInput("");
  const [texto, setTextoError, setTexto] = useInput("");

  useEffect(
    () => {
      post.forEach(({ title, category, author, body }) => {
        setTitulo(title);
        setCategoria(category);
        setAutor(author);
        setTexto(body);
      });
    },
    [post]
  );

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
      if (post.length > 0) {
        dispatch(handlePostEdit(post[0].id, titulo.value, texto.value));
      } else {
        dispatch(
          handlePostAdd(titulo.value, autor.value, categoria.value, texto.value)
        );
      }

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
              <TextInput
                disabled={post.length > 0}
                {...autor}
                label="Autor"
                placeholder="Autor do post"
              />
            </div>
            <div>
              <SelectInput
                disabled={post.length > 0}
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

function mapStateToProps({ categories }) {
  if (Object.keys(categories).length === 0) return {};

  return {
    categories: Object.values(categories).map(({ name }) => ({
      value: name,
      label: name.charAt(0).toUpperCase() + name.slice(1)
    }))
  };
}

export const PostEdit = withRouter(
  connect(mapStateToProps)(withStyles(styles)(SimplePostEdit))
);
