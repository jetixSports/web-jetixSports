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
                <Background sx={{backgroundColor:"#00003d"}} src="./backgrounds/torneo.svg"></Background>
                <Box sx={{color:'white', margin:'220px 0  0 100px'}}>
                    <Typography variant="h4" sx={{fontWeight: 'bold',marginBottom:'10px'}}>
                    ¡Para los espectadores, ¡vive la emoción en vivo!</Typography>
                    <Typography>¡No te pierdas ningún evento! Jetix Sports garantiza<br/> 
                        streams en alta calidad para tus eventos de eSports favoritos.</Typography>
                </Box>
            </Box>
        </BoxHeader>
        <Box>
        <CardStream/>
        </Box>


    </Box>
  )
}
