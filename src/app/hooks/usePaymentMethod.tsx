'use client'
import React, { useState, ReactNode, SetStateAction } from 'react';
import { Box, InputLabel, MenuItem, Select, } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PaymentDetails } from '@/src/app/(auth)/dashboard/dashboard.types';

export default function usePaymentMethod({ payments }: { payments: PaymentDetails[] | null }) {

  const [paymentType, setPaymentType] = useState('');
  const handlePaymentTypeChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPaymentType(event.target.value);
  };
  const onlyPay = payments?.find(i => i.typePay == paymentType) ?? null
  return ({
      ReactNode:(<Box sx={{ marginTop: '30px' }}>

      <Stack spacing={{ xs: 3, sm: 2 }} useFlexGap>
        <FormControl component="fieldset" fullWidth>
          <InputLabel id="payment-method-label" sx={{ color: 'white' }}>Método de pago</InputLabel>
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
            <MenuItem value="mobile_payment">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography>Pago Móvil</Typography>
              </Box>
            </MenuItem>
            <MenuItem value="bank_transfer">
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
        {onlyPay && paymentType === 'mobile_payment' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, color: 'white', marginTop: '10px' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography variant="body1">
                Codigo del Banco:
              </Typography>
              <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                {onlyPay?.details.mobileCode}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography variant="body1" >
                Telefono:
              </Typography>
              <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                {onlyPay?.details.phoneNumber}

              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography variant="body1">
                Cedula:
              </Typography>
              <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                {onlyPay?.details.identity}

              </Typography>
            </Box>
          </Box>
        )}
        {onlyPay && paymentType === 'bank_transfer' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, color: 'white', marginTop: '10px' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography variant="body1">
                Numero de Cuenta:
              </Typography>
              <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
               {onlyPay?.details?.bankNumber}
              </Typography>
            </Box>
          </Box>
        )}
        {onlyPay && paymentType === 'binance' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, color: 'white', marginTop: '10px' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography variant="body1">
                Correo Electronico:
              </Typography>
              <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                               {onlyPay?.details?.email}

              </Typography>
            </Box>
            
          </Box>
        )}
        {!onlyPay && <Typography color='white' sx={{textAlign:'center'}}>No hay datos de pagos para este tipo de pago</Typography>}
      </Stack>

    </Box>
    
  ),
  paymentType,setPaymentType,
  onlyPay
});
}