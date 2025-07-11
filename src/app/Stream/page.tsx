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
                    Para los espectadores, ¡vive la emoción en vivo!</Typography>
                    <Typography>¡No te pierdas ningún evento! Jetix Sports garantiza 
                        streams en alta calidad para tus eventos de eSports favoritos, 
                        de tus juegos favoritos con tus competidores favoritos. 
                        Mantente al día con los horarios y no te pierdas los torneos 
                        del momento. ¡Se parte de la competencia, todo show necesita 
                        su audiencia después de todo!</Typography>
                </Box>
            </Box>
        </BoxHeader>
        <Box>
        <CardStream/>
        </Box>


    </Box>
  )
}
