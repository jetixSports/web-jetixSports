import React from 'react';
import {Box, Typography, FormControl} from '@mui/material';

import Background from '../components/UX/Background/Background';
import Buttons from '../components/UX/Buttons/Buttons';
import BoxHeader from '../components/UX/Box/Box';
import Inputs from '../components/UX/Inputs/Inputs';
import CardContacos from '../components/UX/Card/CardContacos';

export default function Contact() {
  return (
    <Box>
        <BoxHeader>
            <Background src="./backgrounds/login.svg"></Background>
            <Box sx={{color:'white', margin:'220px 0  0 100px'}}>
                <Typography variant="h4" sx={{fontWeight: 'bold',marginBottom:'10px'}}>
                    Disfruta de tus Torneos Favoritos</Typography>
                <Typography>Diseñada para los verdaderos competidores y fans. </Typography>
                <Typography>Disfruta streaming en vivo de torneos de eSports y deportes físicos,</Typography>
                <Typography> y descubre eventos exclusivos, todo en un solo lugar. </Typography>
            </Box>
        </BoxHeader>
        
        <Box sx={{marginTop:'120px', display:'flex',justifyContent:'center', backgroundColor:'#00003d', flexDirection:'column',textAlign:'center'}}>
            
            <Typography variant="h6" sx={{fontWeight: 'bold',marginBottom:'10px', color:'white'}}>
                Escribe un Mensaje
            </Typography>
           
            <CardContacos></CardContacos>
        </Box>
    </Box>
  )
}
