import React from 'react';
import {  Box,  Card,  Typography,  Button, CardMedia, CardContent, CardActions,
 Chip, LinearProgress, Container} from "@mui/material";


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
  url: string
}

export default function CardStream() {
const TorneoStream: Torneo[] = [
  {
    id: 1,
    name: "Copa de Oro de Fútbol",
    typeSport: "Fútbol",
    status: "Activo",
    quotas: 16,
    teamSpace: 4,
    amount: "$5",
    startDate: "2023-08-15",
    image: './assets/img/futbol.png',
    url: ''
  },
  {
    id: 2,
    name: "Torneo de league of legends",
    typeSport: "League of Legends",
    status: "Próximamente",
    quotas: 8,
    teamSpace: 6,
    amount: "$8",
    startDate: "2023-09-01",
    image:'./assets/img/lol.png',
    url: ''
  },
  {
    id: 3,
    name: "Liga de Voleibol",
    typeSport: "Voleibol",
    status: "Finalizado",
    quotas: 12,
    teamSpace: 5,
    amount: "$3",
    startDate: "2023-05-10",
    image:'./assets/img/lol.png',
    url: ''
  },

];
  const Players = TorneoStream.length

  return (
    <Box sx={{ py: 3,width: '100%' }}>
      <Container maxWidth="lg">
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 4 }}>

          {TorneoStream.map((torneo) => (
            <Box key={torneo.id} sx={{width:'100%'}}
            >
              <Card sx={{ height: '120px',width:'100%', display: 'flex',backgroundColor:'#2f105b',flexDirection: 'row',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6 }}}
               >
                <CardMedia
                  //src={process.env.NEXT_PUBLIC_HOST_SERVICE + "/images/tournaments/" +torneo._idImg}
                  src={torneo.image}
                  component="img"
                  sx={{ width: 200 }}
                  image={torneo.image}
                  alt={torneo.name}
                />
                <Box sx={{ flexGrow: '1', display: 'flex', flexDirection: 'row' }}>

                    <CardContent sx={{ display: 'flex', flexDirection: 'row'}}>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column',width: '400px', justifyContent:'center' }}>
                            <Typography gutterBottom variant="h5" component="div" sx={{color:"white" }}>
                            {torneo.name}
                            </Typography>
                  
                            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                <Chip label={torneo.typeSport} sx={{color:"white" }} size="small" />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent:'center', flexDirection: 'column',width:'300px' }}>   
                    
                            <Typography variant="body2" sx={{ mb: 1,color:"white" }}>
                                Jugadores: {torneo.quotas}/{Players} • {torneo.teamSpace} vs {torneo.teamSpace} 
                            </Typography>
                    
                        </Box> 
                    </CardContent>
                    <CardActions sx={{ display: 'flex', flexDirection: 'row', marginLeft:'15px'}}>
                        <Button href={torneo.url} size="small" variant="contained" sx={{backgroundColor:'#77589c',color:'white'}}>
                            Ir al Torneo
                        </Button>
                    </CardActions>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
