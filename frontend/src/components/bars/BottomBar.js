import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Favorite from "@material-ui/icons/Favorite";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit,
    top: "auto",
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    textAlign: "center"
  }
});

function SimpleBottomBar({ classes }) {
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Developed with {<Favorite color="secondary" />} by
            <a
              href="https://github.com/samuel-tonini"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Samuel Tonini
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export const BottomBar = withStyles(styles)(SimpleBottomBar);
