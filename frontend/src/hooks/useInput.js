import { useState } from "react";

export function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const [errorMsg, setErrorMsg] = useState("");

  return [
    {
      value,
      onChange: e => setValue(e.target.value),
      error: errorMsg !== "",
      helperText: errorMsg
    },
    setErrorMsg,
    setValue
  ];
}
