import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

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

function SimpleTopBar({ classes, hideButtons = false, history, categories }) {
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
              {Object.values(categories).map(({ name, path }) => (
                <Button
                  color="inherit"
                  key={name}
                  onClick={() => history.push(`/${path}`)}
                >
                  {name}
                </Button>
              ))}
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

function mapStateToProps({ categories }) {
  return { categories };
}

export const TopBar = connect(mapStateToProps)(
  withRouter(withStyles(styles)(SimpleTopBar))
);
