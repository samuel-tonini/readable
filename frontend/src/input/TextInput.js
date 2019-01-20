import React from "react";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  textField: {
    margin: theme.spacing.unit
  }
});

function SimpleText({ classes, ...props }) {
  return (
    <TextField
      className={classes.textField}
      variant="outlined"
      {...props}
      fullWidth
    />
  );
}

export const TextInput = withStyles(styles)(SimpleText);
