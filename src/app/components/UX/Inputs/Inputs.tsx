import {
  Box,
  Input,
  InputBase,
  InputProps,
  SxProps,
  Theme,
} from "@mui/material";
import React from "react";

function Inputs({ sx, ...allProps }: InputProps) {
  const FormStyles: SxProps<Theme> = {
    paddingX: "10px",
    marginY: "5px",
    backgroundColor: "#20105B",
    borderRadius: "10px",
    color: "white",
    height: 36,
    ...sx,
  };
  return <InputBase {...allProps} sx={FormStyles} />;
}

export default Inputs;
