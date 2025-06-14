import { Box, FormControl, SxProps } from "@mui/material";
import React from "react";
import { FormParams } from "./Form.types";

function Form({ styles, children }: FormParams) {
  const FormStyles: {Box:SxProps,form:SxProps} = {
    Box: {
      maxWidth: "380px",
      minWidth: "210px",
      margin: { xs: 1, sm: 2 },
      padding: { xs: 3, sm: 5 },
      backgroundColor: "#00003D",
      border: "solid white 2px",
      borderRadius: "14px",
      ...styles?.Box,
    },
    form:{
      ...styles?.form,
    }
  };
  return (
    <Box sx={FormStyles.Box}>
      <FormControl sx={FormStyles.form}>{children}</FormControl>
    </Box>
  );
}

export default Form;
