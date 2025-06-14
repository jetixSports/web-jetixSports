import { Button, ButtonProps, SxProps, Theme } from "@mui/material";
import React from "react";

export default function Buttons({ sx, ...allProps }: ButtonProps) {
  const FormStyles: SxProps<Theme>  = {
    backgroundColor: "#6A00FF",
    borderRadius: "10px",
    height: 36,
    fontSize:'16px',
    ...sx,
  };
  return <Button {...allProps} sx={FormStyles} style={{ textTransform: 'none' }} />;
}
