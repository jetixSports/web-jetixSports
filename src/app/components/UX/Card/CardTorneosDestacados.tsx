import React from 'react';
import {  Box,  Card,  Typography,  Button, CardMedia, CardContent, CardActions,
   Chip, LinearProgress, Container} from "@mui/material";


interface Torneo {
  id: number;
  title: string;
  juego: string;
  fecha: string;
  plataforma: string;
  premio: string;
  Precio: string;
  Players: number;
  numPlayers: number;
  Team: number;
  image: any;
}

export default function CardTorneosDestacados() {
  const TorneoDes: Torneo[] = [
    {
      id: 1,
      title: 'Torneo League of Legends',
      juego: 'LoL',
      fecha: '02/12/2025',
      plataforma: 'Twitch',
      premio: '300$',
      Precio: '8$',
      Players: 120,
      numPlayers: 80,
      Team: 5,
      image: './assets/img/valorant.png'
    },
    {
      id: 2,
      title: 'Campeonato Valorant Champions',
      juego: 'Valorant',
      fecha: '02/12/2025',
      plataforma: 'YouTube Gaming',
      premio: '500$',
      Precio: '10$',
      Players: 100,
      numPlayers: 75,
      Team: 5,
      image: './assets/img/valorant.png'
    },
    {
      id: 3,
      title: 'Batalla Fortnite Season 5',
      juego: 'Fortnite',
      fecha: '02/12/2025',
      plataforma: 'Twitch',
      premio: '450$',
      Precio: '5$',
      Players: 150,
      numPlayers: 120,
      Team: 2,
      image: './assets/img/valorant.png'
    },
    {
      id: 4,
      title: 'CS:GO Global Offensive',
      juego: 'CS:GO',
      fecha: '02/12/2025',
      plataforma: 'Facebook Gaming',
      premio: '600$',
      Precio: '12$',
      Players: 80,
      numPlayers: 65,
      Team: 5,
      image: './assets/img/valorant.png'
    },
    {
      id: 5,
      title: 'Dota 2 International Qualifiers',
      juego: 'Dota 2',
      fecha: '02/12/2025',
      plataforma: 'Twitch',
      premio: '750$',
      Precio: '15$',
      Players: 90,
      numPlayers: 85,
      Team: 5,
      image: './assets/img/valorant.png'
    },
    {
      id: 6,
      title: 'Rocket League Championship',
      juego: 'Rocket League',
      fecha: '02/12/2025',
      plataforma: 'YouTube Gaming',
      premio: '350$',
      Precio: '7$',
      Players: 110,
      numPlayers: 95,
      Team: 3,
      image: './assets/img/valorant.png'
    }
  ];

  return (
    <Box sx={{ py: 3,width: '100%' }}>
      <Container maxWidth="lg">
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 4 }}>

          {TorneoDes.map((torneo) => (
            <Box 
              key={torneo.id}
              sx={{width: { xs: '100%', sm: 'calc(50% - 32px)', 
                md: 'calc(33.333% - 32px)' },maxWidth: 400
              }}
            >
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  backgroundColor:'#2f105b',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={torneo.image}
                  alt={torneo.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div" sx={{color:"white" }}>
                    {torneo.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Chip label={torneo.juego} sx={{color:"white" }} size="small" />
                    <Chip label={torneo.plataforma} variant="outlined" sx={{color:"white" }} size="small" />
                  </Box>
                  
                  <Typography variant="body2" color="white" sx={{ mb: 1 }}>
                    Premio: <strong>{torneo.premio}</strong> • Inscripción: <strong>{torneo.Precio}</strong>
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 1,color:"white" }}>
                    Fecha: {torneo.fecha}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ mb: 1,color:"white" }}>
                    Jugadores: {torneo.numPlayers}/{torneo.Players} • {torneo.Team} vs {torneo.Team} 
                  </Typography>
                  
                  <LinearProgress 
                    variant="determinate" 
                    value={(torneo.numPlayers / torneo.Players) * 100} 
                    sx={{ height: 8, borderRadius: 4, mb: 1,backgroundColor:'#fff' }}
                  />
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                  <Button size="small" sx={{color:'white'}}> 
                    Ver detalles
                  </Button>
                  <Button size="small" variant="contained" sx={{backgroundColor:'#77589c',color:'white'}}>
                    Unirse
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}