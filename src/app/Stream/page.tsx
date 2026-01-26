'use client'
import React, { useState } from 'react';
import {
  Box, Card, Typography, Button, CardMedia, CardContent, CardActions,
  Chip, LinearProgress, Container,
  CircularProgress,
  Alert
} from "@mui/material";
import BoxHeader from '../components/UX/Box/Box';
import Background from '../components/UX/Background/Background';
import CardStream from '../components/UX/Card/CardStream';
import useStream from './useStream';
import usePage from '../usePage';

interface Torneo {
  _id: string;
  name: string;
  typeSport: string;
  status: string;
  quotas: number;
  teamSpace: number;
  amount: string;
  startDate: string;
  _idImg: string;
  teams: any[]
}

interface Stream {
  torneoId: string;
  URL: string;
}

type StreamMap = {
  [key: string]: Stream | undefined;
};

export default function Streaming() {

  const { TorneoDes } = usePage()
  const { stream } = useStream()
  const [Search, SetSearch] = useState(false)
  const [selectedTournament, setSelectedTournament] = useState<Torneo | null>(null);
  const options: Torneo[] = TorneoDes?.map(torneo => ({
    ...torneo,
    label: torneo.name || 'Nombre no disponible'
  })) || [];

  return (
    <Box>
      <BoxHeader>
        <Box sx={{ marginBottom: '60px' }}>
          <Background sx={{ backgroundColor: " #04082a" }} src="./backgrounds/fondo2.svg"></Background>
          <Box sx={{ color: 'white', margin: '220px 0  0 100px' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
              ¡Para los espectadores, ¡vive la emoción en vivo!</Typography>
            <Typography>¡No te pierdas ningún evento! Jetix Sports garantiza<br />
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
      <Box sx={{ py: 3, width: '100%', backgroundColor:'#04082a' }}>
        <Container maxWidth="lg">
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 4
          }}>

            <Box>
              {stream.map((item: any) =>
                <Box sx={{ width: '100%' }}>
                  <Card sx={{
                    height: 'auto',
                    width: '100%',
                    marginTop:'20px',
                    display: 'flex',
                    backgroundColor: '#2f105b',
                    flexDirection: 'row',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6
                    }
                  }}>
                    <CardMedia
                      src={item.imgSrc}
                      component="img"
                      sx={{ width: 200 }}
                    />
                    <Box sx={{ flexGrow: '1', display: 'flex', flexDirection: 'row' }}>
                      <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '400px', justifyContent: 'center' }}>
                          <Typography gutterBottom variant="h5" component="div" sx={{ color: "white" }}>
                            {item.title}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                            <Chip label={item.status == 'active' ? 'Activo' : 'Inactivo'} variant="outlined" sx={{ color: "white" }} size="small" />

                            <Chip label={new Date(item.createdAt).toLocaleDateString()} sx={{ color: "white" }} size="small" />
                          </Box>
                        </Box>

                        {/* <Box sx={{ display: 'flex', justifyContent:'center', flexDirection: 'column', width:'300px' }}>   
                          <Typography variant="body2" sx={{ mb: 1, color: "white" }}>
                            Jugadores: {Players || 0} • {torneo.teamSpace} vs {torneo.teamSpace} 
                          </Typography>
                        </Box>  */}

                      </CardContent>
                      <CardActions sx={{ display: 'flex', flexDirection: 'row', margin: '0 10px 15px' }}>

                        <Button
                          onClick={() => window.open(item.URL, '_blank')}

                          sx={{ backgroundColor: '#77589c', color: 'white' }}
                        >
                          Ir al Stream
                        </Button>
                      </CardActions>
                    </Box>
                  </Card>
                </Box>
              )}
            </Box>
          </Box>
        </Container>
      </Box>


    </Box>
  )
}
