import React from 'react';
import { Box,Typography } from '@mui/material';

import BoxHeader from '../components/UX/Box/Box';
import Background from '../components/UX/Background/Background';
import CardStream from '../components/UX/Card/CardStream';

export default function Streaming() {
  return (
    <Box>
        <BoxHeader>
            <Box sx={{marginBottom:'60px'}}>
                <Background src="./backgrounds/login.svg"></Background>
                <Box sx={{color:'white', margin:'220px 0  0 100px'}}>
                    <Typography variant="h4" sx={{fontWeight: 'bold',marginBottom:'10px'}}>
                        Disfruta de tus Torneos Favoritos</Typography>
                    <Typography>Diseñada para los verdaderos competidores y fans. </Typography>
                    <Typography>Disfruta streaming en vivo de torneos de eSports y deportes físicos,</Typography>
                    <Typography> y descubre eventos exclusivos, todo en un solo lugar. </Typography>
                </Box>
            </Box>
        </BoxHeader>
        <Box>
        <CardStream/>
        </Box>


    </Box>
  )
}
