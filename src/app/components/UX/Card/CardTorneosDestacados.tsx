import React from 'react';
import {
  Box, Card, Typography, Button, CardMedia, CardContent, CardActions,
  Chip, LinearProgress, Container, CircularProgress, Alert
} from "@mui/material";
import usePage from '@/src/app/usePage';
import Image from 'next/image';


export default function CardTorneosDestacados() {
  const { TorneoDes, loading, error } = usePage();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box my={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }
  return (
    <Box sx={{ py: 3, width: '100%' }}>
      <Container maxWidth="lg">
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 4
        }}>

          {TorneoDes.map((torneo, i) => i>9?'':(
            <Box
              key={i}
              sx={{
                width: {
                  xs: '100%', sm: 'calc(50% - 32px)',
                  md: 'calc(33.333% - 32px)'
                }, maxWidth: 400
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  maxHeight:"500px",
                  display: 'flex',
                  backgroundColor: '#2f105b',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6
                  }
                }}
              >
                <Image
                  src={process.env.NEXT_PUBLIC_HOST_SERVICE + "/images/tournaments/" +torneo._idImg}
                  height={128}
                  width={128}
                  alt={"fondo"}
                  className={"w-full h-full"}
                  unoptimized={true}
                ></Image>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div" sx={{ color: "white" }}>
                    {torneo.name}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Chip label={torneo.typeSport} sx={{ color: "white" }} size="small" />
                  </Box>

                  <Typography variant="body2" color="white" sx={{ mb: 1 }}>
                    Inscripción: <strong>{torneo.amount}</strong>
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 1, color: "white" }}>
                    Fecha de Inicio: {new Date(torneo.startDate).toLocaleString()}
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 1, color: "white" }}>
                    Jugadores: {torneo.teams.length}/{torneo.quotas} • {torneo.teamSpace} vs {torneo.teamSpace}
                  </Typography>

                  <LinearProgress
                    variant="determinate"
                    value={(torneo.teams.length==0?0:(torneo.teams.length / torneo.quotas)) * 100}
                    sx={{ height: 8, borderRadius: 4, mb: 1, backgroundColor: '#fff' }}
                  />
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                  <Button href={`/Torneos/${torneo._id}`} size="small" sx={{ color: 'white' }}>
                    Ver detalles
                  </Button>
                  <Button href={`/Torneos/${torneo._id}/inscription`} size="small" variant="contained" sx={{ backgroundColor: '#77589c', color: 'white' }}>
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