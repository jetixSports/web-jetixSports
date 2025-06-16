import { Button, ButtonProps, SxProps, Theme } from "@mui/material";
import React from "react";

export default function Buttons({ sx, ...allProps }: ButtonProps) {
  const styles: SxProps<Theme>  = {
    backgroundColor: "#6A00FF",
    borderRadius: "10px",
    height: 36,
    fontSize:'16px',
    ...sx,
  };
  return <Button {...allProps} sx={styles} style={{ textTransform: 'none' }} />;
}
