'use client';
import React from "react";
import { Box, Card, Typography, Button} from "@mui/material";

import Background from "../components/UX/Background/Background";
import BoxHeader from "../components/UX/Box/Box";
import CardTorneosDestacados from "../components/UX/Card/CardTorneosDestacados";
import CardTorneosProximos from "../components/UX/Card/CradTorneos";

export default function Torneos() {
  return (
    <Box sx={{ margin:'0'}}>
      <BoxHeader>
        <Background src="./backgrounds/torneo.svg"></Background>
        <Box sx={{color:'white', margin:'220px 0  0 100px'}}>

          <Typography variant="h4" sx={{fontWeight: 'bold',marginBottom:'10px'}}>
            Disfruta de tus Torneos Favoritos</Typography>
          <Typography>Diseñada para los verdaderos competidores y fans. </Typography>
          <Typography>Disfruta streaming en vivo de torneos de eSports y deportes físicos,</Typography>
          <Typography> y descubre eventos exclusivos, todo en un solo lugar. </Typography>
          
        </Box>
        <Box>
          <Typography variant="h4" sx={{fontWeight: 'bold',color: 'white', marginTop:'100px',marginLeft:'100px'}}>
            Torneos Destacados
          </Typography>
        </Box>
      </BoxHeader>

        <Box  sx={{padding:'40px',background:'#00003d'}}>
            <CardTorneosDestacados/>
        </Box>

        <Box>
            <Box>
                <Typography variant="h4" sx={{fontWeight: 'bold',color: 'white', marginTop:'100px',marginLeft:'100px'}}>
                    Torneos Proximos
                </Typography>
            </Box>
            <Box>
                <CardTorneosProximos/>
            </Box>
        </Box>
    </Box>
  )
}
