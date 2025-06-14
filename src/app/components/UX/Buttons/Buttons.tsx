import { Button, ButtonProps,  } from '@mui/material';
import React from 'react'

export default function Buttons({sx,...allProps}: ButtonProps) {
     const FormStyles: any= {
        backgroundColor:'#6A00FF',
        borderRadius:'10px',
         ...sx
         };
  return <Button {...allProps}  sx={FormStyles}/>
}
