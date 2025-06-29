import { Button, ButtonProps, SxProps, Theme } from "@mui/material";
import React from "react";

export default function Buttons({ sx, ...allProps }: ButtonProps) {
  const styles: SxProps<Theme>  = {
    backgroundColor: "#6A00FF",
    borderRadius: "10px",
    height: 36,
    fontSize:'16px',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      backgroundColor: "#6A00FF",
      color:'white'},
    ...sx,
  };
  return <Button {...allProps} sx={styles} style={{ textTransform: 'none' }} />;
}
