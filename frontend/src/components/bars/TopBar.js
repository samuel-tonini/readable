import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withRouter, Link } from "react-router-dom";

const styles = theme => ({
  root: {
    top: "auto",
    flexGrow: 1,
    marginBottom: theme.spacing.unit
  },
  grow: {
    flexGrow: 1
  }
});

function SimpleTopBar({ classes, hideButtons = false, history }) {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" color="inherit" className={classes.grow}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Readable Blog
            </Link>
          </Typography>
          {!hideButtons && (
            <>
              <Button color="inherit" onClick={() => history.push("/new")}>
                Novo
              </Button>
              <Button color="inherit" onClick={() => history.push("/react")}>
                React
              </Button>
              <Button color="inherit" onClick={() => history.push("/redux")}>
                Redux
              </Button>
              <Button color="inherit" onClick={() => history.push("/udacity")}>
                Udacity
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export const TopBar = withRouter(withStyles(styles)(SimpleTopBar));
