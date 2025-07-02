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
        lg: "60%",    
        xl: "800px"   
      },
      maxWidth: "800px",
      minWidth: "300px",  
      marginX: "auto",   
      marginTop:{ xs: 3, sm: 5 },
      marginBottom: { xs: 2, sm: 2 },
      paddingX: { xs: 5, sm: 6 },
      paddingY: { xs: 3, sm: 4 },
      backgroundColor: "#00003D",
      border: "solid white 1px",
      borderRadius: "14px",
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