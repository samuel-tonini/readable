import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

function SimpleSelect({
  error = false,
  helperText = "",
  classes,
  label,
  options = [],
  ...props
}) {
  const [id] = useState(`outlined_${new Date().getTime()}`);
  const [labelWidth, setLabelWidth] = useState(0);
  const inputLabelRef = useRef(null);

  useEffect(() => {
    setLabelWidth(ReactDOM.findDOMNode(inputLabelRef.current).offsetWidth);
  }, []);

  return (
    <FormControl
      autoComplete="off"
      error={error}
      fullWidth
      variant="outlined"
      className={classes.formControl}
    >
      <InputLabel ref={inputLabelRef} htmlFor={id}>
        {label}
      </InputLabel>
      <Select
        {...props}
        input={<OutlinedInput labelWidth={labelWidth} id={id} />}
      >
        <MenuItem value="">
          <em>Limpar</em>
        </MenuItem>
        {options.map(({ value, label, disabled = false }) => (
          <MenuItem key={value} value={value} disabled={disabled}>
            {label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export const SelectInput = withStyles(styles)(SimpleSelect);
