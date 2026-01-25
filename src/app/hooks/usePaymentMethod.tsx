'use client'
import React, { useState, ReactNode, SetStateAction } from 'react';
import { Box, Chip, InputLabel, MenuItem, Select, } from "@mui/material";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PaymentDetails } from '@/src/app/(auth)/dashboard/dashboard.types';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

export default function usePaymentMethod({ payments }: { payments: PaymentDetails[] | null }) {

  const [paymentType, setPaymentType] = useState('');
  const onlyPay = payments?.find(i => i.typePay == paymentType) ?? null
  return ({
      ReactNode:(<Box sx={{ marginTop: '30px' }}>

      <Stack spacing={{ xs: 3, sm: 2 }} useFlexGap>
  
        <Box sx={{display:'flex', columnGap:'3px'}}>
          <Chip 
            onClick={() => setPaymentType('mobile_payment')}
            icon={<PhoneAndroidIcon/>}
            color={paymentType === 'mobile_payment' ? 'secondary' : 'secondary'}
            variant={paymentType === 'mobile_payment' ? 'filled' : 'outlined'}
            label='Pago Movil'
          />
          
          <Chip 
            onClick={() => setPaymentType('bank_transfer')}
            icon={<AccountBalanceIcon/>}
            color={paymentType === 'bank_transfer' ? 'secondary' : 'secondary'}
            variant={paymentType === 'bank_transfer' ? 'filled' : 'outlined'}
            label='Transferencia'
          />

          <Chip 
            onClick={() => setPaymentType('binance')}
            icon={<CurrencyBitcoinIcon/>}
            color={paymentType === 'binance' ? 'secondary' : 'secondary'}
            variant={paymentType === 'binance' ? 'filled' : 'outlined'}
            label='Biance'
          />
        </Box>
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