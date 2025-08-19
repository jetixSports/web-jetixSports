import { Box, FormControl, SxProps } from "@mui/material";
import React from "react";
import { FormParams } from "./Form.types";

function Form({ styles, children,handleSubmit }: FormParams) {
  const FormStyles: {Box:SxProps,form:SxProps} = {
    Box: {
      maxWidth: "380px",
      minWidth: "210px",
      marginX: { xs: 1, sm: 2 },
      marginY: { xs: 1, sm: 2 },
      paddingX: { xs: 4, sm: 5},
      paddingY: { xs: 2, sm: 3},
      backgroundColor: "#070735",
      border: "solid #562ab9 1px",
      borderRadius: "14px",
      boxShadow: '10px 10px rgb(96 45 191)',
      ...styles?.Box,
    },
    form:{
      ...styles?.form,
    }
  };
  return (
    <Box sx={FormStyles.Box}>
      <form onSubmit={handleSubmit}>{children}</form>
    </Box>
  );
}

export default Form;
