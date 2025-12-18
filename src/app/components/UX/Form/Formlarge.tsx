import { Box, FormControl, SxProps } from "@mui/material";
import React from "react";
import { FormParams } from "./Form.types";

function FormLarge({ styles, children, handleSubmit }: FormParams) {
  const FormStyles: { Box: SxProps, form: SxProps } = {
    Box: {
      width: {
        xs: "90%",   
        sm: "80%",    
        md: "70%",    
        lg: "80%",    
        xl: "900px"   
      },
      maxWidth: "900px",
      minWidth: "400px",  
      marginX: "auto",   
      marginTop:{ xs: 3, sm: 5 },
      marginBottom: { xs: 2, sm: 2 },
      paddingX: { xs: 5, sm: 6 },
      paddingY: { xs: 3, sm: 4 },
      backgroundColor: "#00003D",
      border: "none",
      ...styles?.Box,
    },
    form: {
      width: "100%",    
      ...styles?.form,
    }
  };

  return (
    <Box sx={FormStyles.Box}>
          <form onSubmit={handleSubmit}>{children}</form>
        </Box>
  );
}

export default FormLarge;