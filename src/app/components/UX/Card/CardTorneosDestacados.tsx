import React from 'react';
import {  Box,  Card,  Typography,  Button, CardMedia, CardContent, CardActions,
   Chip, LinearProgress, Container, CircularProgress,Alert} from "@mui/material";
//import usePage from '@/src/app/usePage';

 interface Torneo {
  id: number;
  name: string;
  typeSport: string;
  status:string;
  quotas: number;
  teamSpace:number;
  amount: string;
  startDate: string;
  image: any;
}

export default function CardTorneosDestacados() {
   // { TorneoDes, loading, error } = usePage();
  //const Players = TorneoDes.length

  // if (loading) {
  //   return (
  //     <Box display="flex" justifyContent="center" my={4}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  // if (error) {
  //   return (
  //     <Box my={4}>
  //       <Alert severity="error">{error}</Alert>
  //     </Box>
  //   );
  // }

const torneosDes: Torneo[] = [
  {
    id: 1,
    name: "Torneo de Golf Benéfico",
    typeSport: "Golf",
    status: "Activo",
    quotas: 40,
    teamSpace: 1,
    amount: "$2000",
    startDate: "2023-09-15",
    image: './assets/img/valorant.png'
  },
  {
    id: 2,
    name: "Torneo Relámpago de Vóley",
    typeSport: "Vóley",
    status: "Próximamente",
    quotas: 8,
    teamSpace: 6,
    amount: "$1200",
    startDate: "2023-09-01",
    image: './assets/img/valorant.png'
  },
  {
    id: 3,
    name: "Liga de Béisbol Primavera",
    typeSport: "Béisbol",
    status: "Finalizado",
    quotas: 10,
    teamSpace: 9,
    amount: "$4000",
    startDate: "2023-04-15",
    image: './assets/img/valorant.png'
  },
  {
    id: 4,
    name: "Tenis Masters",
    typeSport: "Tenis",
    status: "Activo",
    quotas: 32,
    teamSpace: 1,
    amount: "$2500",
    startDate: "2023-07-20",
    image: './assets/img/valorant.png'
  },
  {
    id: 5,
    name: "Torneo de Ajedrez Abierto",
    typeSport: "Ajedrez",
    status: "Activo",
    quotas: 100,
    teamSpace: 1,
    amount: "Gratis",
    startDate: "2023-08-20",
    image:'./assets/img/valorant.png'
  },
  {
    id: 6,
    name: "Copa de Rugby Universitario",
    typeSport: "Rugby",
    status: "Próximamente",
    quotas: 8,
    teamSpace: 15,
    amount: "$3500",
    startDate: "2023-11-10",
    image:'./assets/img/valorant.png'
  },
];
  const Players = torneosDes.length

  return (
    <Box sx={{ py: 3,width: '100%' }}>
      <Container maxWidth="lg">
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 4 }}>

          {torneosDes.map((torneo) => (
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
                  alt={torneo.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div" sx={{color:"white" }}>
                    {torneo.name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Chip label={torneo.typeSport} sx={{color:"white" }} size="small" />
                  </Box>
                  
                  <Typography variant="body2" color="white" sx={{ mb: 1 }}>
                    Inscripción: <strong>{torneo.amount}</strong>
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 1,color:"white" }}>
                    Fecha de Inicio: {torneo.startDate}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ mb: 1,color:"white" }}>
                    Jugadores: {Players}/{torneo.quotas} • {torneo.teamSpace} vs {torneo.teamSpace} 
                  </Typography>
                  
                  <LinearProgress 
                    variant="determinate" 
                    value={(torneo.quotas / Players) * 100} 
                    sx={{ height: 8, borderRadius: 4, mb: 1,backgroundColor:'#fff' }}
                  />
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                  <Button href={`/Torneos/${torneo.id}`} size="small" sx={{color:'white'}}> 
                    Ver detalles
                  </Button>
                  <Button href={`/Torneos/${torneo.id}/Inscripcion`} size="small" variant="contained" sx={{backgroundColor:'#77589c',color:'white'}}>
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
