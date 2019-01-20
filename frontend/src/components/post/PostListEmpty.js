import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";

const styles = {
  media: {
    maxHeight: 400,
    objectFit: "cover"
  },
  button: {
    textAlign: "center"
  }
};

function PostListEmpty({ classes, history }) {
  return (
    <div className={classes.button}>
      <img
        className={classes.media}
        src="https://svgsilh.com/svg_v2/1299326.svg"
        alt="Caneta e pena"
      />
      <Typography paragraph variant="h6">
        Nenhum post foi encontrado :(
      </Typography>
      <Button
        color="primary"
        variant="contained"
        onClick={() => history.push("/new")}
      >
        Escrever novo post
      </Button>
    </div>
  );
}

export default withRouter(withStyles(styles)(PostListEmpty));
