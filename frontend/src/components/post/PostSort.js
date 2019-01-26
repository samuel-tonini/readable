import React from "react";
import { SelectInput } from "../../input";
import { useInput } from "../../hooks";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { postSort } from "../../actions/posts";

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

function SimplePostEdit({ classes, dispatch }) {
  const [ordem, , setOrdem] = useInput("vote");
  const [classificacao, , setClassificacao] = useInput("decrescente");

  const ordemOptions = [
    {
      value: "vote",
      label: "Votação"
    },
    {
      value: "data",
      label: "Data"
    }
  ];

  const classficacaoOptions = [
    {
      value: "crescente",
      label: "Crescente"
    },
    {
      value: "decrescente",
      label: "Decrescente"
    }
  ];

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <SelectInput
            {...ordem}
            options={ordemOptions}
            label="Ordem"
            onChange={e => {
              setOrdem(e.target.value);
              dispatch(postSort(e.target.value, classificacao.value));
            }}
          />
          <SelectInput
            {...classificacao}
            options={classficacaoOptions}
            label="Classificação"
            onChange={e => {
              setClassificacao(e.target.value);
              dispatch(postSort(ordem.value, e.target.value));
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export const PostSort = connect()(withStyles(styles)(SimplePostEdit));
