import React, { useState } from 'react';
import { InputAdornment, IconButton, InputProps, } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Inputs from './Inputs';
import { CustomInputProps } from '@/src/app/types/inputs';

const PasswordInputs = React.forwardRef<HTMLInputElement, CustomInputProps>(
  (allProps, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <Inputs
        {...allProps}
        ref={ref}
        sx={{ width: "100%", mb: 2 }}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />

    );
  }
);
export default PasswordInputs;