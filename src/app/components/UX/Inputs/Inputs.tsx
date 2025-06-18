import { CustomInputProps } from "@/src/app/types/inputs";
import {
  FormControl,
  FormHelperText,
  InputBase,
  InputBaseProps,
  SxProps,
  Theme,
} from "@mui/material";
import React from "react";

const Inputs = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ sx, error, helperText, ...allProps }, ref) => {
    const styles: SxProps<Theme> = {
      paddingX: "10px",
      marginY: "5px",
      backgroundColor: "#20105B",
      borderRadius: "10px",
      color: "white",
      height: 36,
      ...sx,
    };
    return <FormControl fullWidth error={error}>
      <InputBase {...allProps} sx={styles} inputRef={ref} />
      {error && (
        <FormHelperText sx={{ mx: '0px', mt: '0px' }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  }
);
export default Inputs;