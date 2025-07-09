'use client'
import React from 'react';
import {
  Box, Card, Typography, Button, CardMedia, CardContent, CardActions,
  Chip, LinearProgress, Container
} from "@mui/material";
import { useRouter } from 'next/navigation';
import Link from 'next/link';


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
  url: any;
}

export default function CardStream() {
  const router = useRouter()
  const TorneoPro: Torneo[] = [
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
      image: './assets/img/valorant.png',
      url: 'https://www.twitch.tv/ibai'
    },
    {
      id: 2,
      title: 'Campeonato Valorant Champions',
      juego: 'Valorant',
      fecha: '02/12/2025',
      plataforma: 'Twitch',

      premio: '500$',
      Precio: '10$',
      Players: 100,
      numPlayers: 75,
      Team: 5,
      image: './assets/img/valorant.png',
      url: 'https://www.twitch.tv/ibai'
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
      image: './assets/img/valorant.png',
      url: 'https://www.twitch.tv/ibai'
    },
    {
      id: 4,
      title: 'CS:GO Global Offensive',
      juego: 'CS:GO',
      fecha: '02/12/2025',
      plataforma: 'Twitch',

      premio: '600$',
      Precio: '12$',
      Players: 80,
      numPlayers: 65,
      Team: 5,
      image: './assets/img/valorant.png',
      url: 'https://www.twitch.tv/ibai'
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
      image: './assets/img/valorant.png',
      url: 'https://www.twitch.tv/ibai'
    },
    {
      id: 6,
      title: 'Rocket League Championship',
      juego: 'Rocket League',
      fecha: '02/12/2025',
      plataforma: 'Twitch',

      premio: '350$',
      Precio: '7$',
      Players: 110,
      numPlayers: 95,
      Team: 3,
      image: './assets/img/valorant.png',
      url: 'https://www.twitch.tv/ibai'
    }
  ];

  return (
    <Box sx={{ py: 3, width: '100%' }}>
      <Container maxWidth="lg">
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 4
        }}>

          {TorneoPro.map((torneo) => (
            <Link href={torneo.url} key={torneo.id} className='w-full no-underline' target="_blank"
            >
              <Card sx={{
                cursor: 'pointer', height: '120px', width: '100%', display: 'flex', backgroundColor: '#2f105b', flexDirection: 'row',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                }
              }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 200 }}
                  image={torneo.image}
                  alt={torneo.title}
                />
                <Box sx={{ flexGrow: '1', display: 'flex', flexDirection: 'row' }}>

                  <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>

                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '400px', justifyContent: 'center' }}>
                      <Typography gutterBottom variant="h5" component="div" sx={{ color: "white" }}>
                        {torneo.title}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <Chip label={torneo.juego} sx={{ color: "white" }} size="small" />
                        <Chip label={torneo.plataforma} variant="outlined" sx={{ color: "white" }} size="small" />
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '300px' }}>
                      <Typography variant="body2" sx={{ mb: 1, color: "white" }}>
                        Jugadores: {torneo.numPlayers}/{torneo.Players} • {torneo.Team} vs {torneo.Team}
                      </Typography>

                    </Box>
                  </CardContent>
                  <CardActions sx={{ display: 'flex', flexDirection: 'row', marginLeft: '15px' }}>
                    <Button href={'/Torneos/'} size="small" variant="contained" sx={{ backgroundColor: '#77589c', color: 'white' }}>
                      Ir al Torneo
                    </Button>
                  </CardActions>
                </Box>
              </Card>
            </Link>
          ))}
        </Box>
      </Container>
    </Box>
  );
}