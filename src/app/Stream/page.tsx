'use client'
import React, { useState } from 'react';
import { Autocomplete, Box,TextField,Typography } from '@mui/material';

import BoxHeader from '../components/UX/Box/Box';
import Background from '../components/UX/Background/Background';
import CardStream from '../components/UX/Card/CardStream';
import useStream from './useStream';
import usePage from '../usePage';

interface Torneo {
  _id: string;
  name: string;
  typeSport: string;
  status:string;
  quotas: number;
  teamSpace:number;
  amount: string;
  startDate: string;
  _idImg: string;
  teams:any[]
}

interface Stream {
  torneoId: string;
  URL: string;
}

type StreamMap = {
  [key: string]: Stream | undefined;
};

export default function Streaming() {
  
  const {TorneoDes} = usePage()
  const {stream} = useStream()
  const [Search, SetSearch] = useState(false)
  const [selectedTournament, setSelectedTournament] = useState<Torneo | null>(null);
      const options : Torneo[] = TorneoDes?.map(torneo => ({
          ...torneo,
          label: torneo.name || 'Nombre no disponible'
      })) || [];

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
        {/* <Box sx={{display:'flex',alignItems:'center', width:'600px', justifyContent:'flex-end'}}> 
          <Box sx={{width:'70%'}}>
            <Autocomplete
              clearOnEscape
              options={options}
              sx={{p: 0, marginY: "5px", backgroundColor: "#20105B",  borderRadius: "10px", height: 55,
              color: "white", // Color del texto en el input (no suficiente por sí solo)
                "& .MuiInputBase-root": {
                  color: "white", // Color del texto ingresado
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "none", 
                },
                "& .MuiInputLabel-root": {
                  color: "white", // Color del label ("Buscar torneos...")
                },
                "& .MuiAutocomplete-popupIndicator": {
                  color: "white", // Color del ícono de desplegar
                },
                "& .MuiAutocomplete-clearIndicator": {
                  color: "white", // Color del ícono de limpiar
                }}}
                renderInput={(params) => <TextField  {...params} label="Buscar torneos por nombre..." />}
                onChange={(event, newValue) => {
                  setSelectedTournament(newValue);
                  SetSearch(true)
                }}
                isOptionEqualToValue={(option, value) => option._id === value._id}
             />
          </Box>
        <Box>

        </Box>
        </Box> */}
        <Box>
        <CardStream/>
        </Box>


    </Box>
  )
}
