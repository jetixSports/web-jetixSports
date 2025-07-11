'use client'
import React, {useState, ReactNode, SetStateAction} from 'react';
import Alert from '@mui/material/Alert';
import { Box, InputLabel, MenuItem, Select,} from "@mui/material";
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

import Inputs from '../Inputs/Inputs';
import Card from '../Card/CardPay';

export default function PaymentMetod() {

    const [paymentType, setPaymentType] = useState('creditCard');
    const handlePaymentTypeChange = (event: {
    target: { value: SetStateAction<string> };
    }) => {
    setPaymentType(event.target.value);
    };

  return (

    <Box sx={{marginTop:'30px'}}>
        
     <Stack spacing={{ xs: 3, sm: 2 }} useFlexGap>
      <FormControl component="fieldset" fullWidth>
         <InputLabel id="payment-method-label" sx={{color:'white'}}>Método de pago</InputLabel>
        <Select
            labelId="payment-method-label"
            id="payment-method-select"
            value={paymentType}
            label="Método de pago"
            onChange={handlePaymentTypeChange}
            sx={{
            width: "100%",
            paddingX: "10px",
            marginY: "5px",
            backgroundColor: "#20105B",
            borderRadius: "10px",
            color: "white",
            height: 36,
          }}
        >
            <MenuItem value="payMovile">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography>Pago Móvil</Typography>
            </Box>
            </MenuItem>
            <MenuItem value="bankTransfer">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography>Transferencia Bancaria</Typography>
            </Box>
            </MenuItem>
            <MenuItem value="binance">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography>Binance</Typography>
            </Box>
            </MenuItem>
        </Select>
      </FormControl>

      {paymentType === 'payMovile' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, color:'white' , marginTop:'10px'}}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1">
              Banco:
            </Typography>
            <Typography variant="body1" sx={{ fontStyle:'italic' }}>
              Banesco {/*Datos del organizador */}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1" >
              Telefono:
            </Typography>
            <Typography variant="body1" sx={{ fontStyle:'italic' }}>
              123456789 {/*Datos del organizador */}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1">
              Cedula:
            </Typography>
            <Typography variant="body1" sx={{ fontStyle:'italic' }}>
              987654321 {/*Datos del organizador */}
            </Typography>
          </Box>
        </Box>
      )}
      {paymentType === 'bankTransfer' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, color:'white' , marginTop:'10px'}}>       
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1">
             Numero de Cuenta:
            </Typography>
            <Typography variant="body1" sx={{ fontStyle:'italic' }}>
             0102 1236 1023 12035614 {/*Datos del organizador */}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1" >
              Cuenta:
            </Typography>
            <Typography variant="body1" sx={{ fontStyle:'italic' }}>
              Corriente {/*Datos del organizador */}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1">
              Cedula:
            </Typography>
            <Typography variant="body1" sx={{ fontStyle:'italic' }}>
              987654321 {/*Datos del organizador */}
            </Typography>
          </Box>
        </Box>
      )}
      {paymentType === 'binance' && (
         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, color:'white' , marginTop:'10px'}}>       
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1">
              Correo Electronico:
            </Typography>
            <Typography variant="body1" sx={{ fontStyle:'italic' }}>
              heartsick@gmail.com {/*Datos del organizador */}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1" >
              Red: 
            </Typography>
            <Typography variant="body1" sx={{ fontStyle:'italic' }}>
              TRC20 {/*Datos del organizador */}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1">
              Cedula:
            </Typography>  
          </Box>
        </Box>
      )}
    </Stack>

    </Box>
  );
}