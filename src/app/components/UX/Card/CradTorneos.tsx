'use client'
import React, { useMemo, useState } from 'react';
import {  Box,  Card,  Typography,  Button, CardMedia, CardContent, CardActions,
 Chip, LinearProgress, Container} from "@mui/material";
import usePage from '@/src/app/usePage';



export default function CardTorneos() {
    const { TorneoDes, loading, error } = usePage();  

  return (
    <Box sx={{ py: 3,width: '100%' }}>
      <Container maxWidth="lg">
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 4 }}>

          {TorneoDes.map((torneo,i) => (
            <Box key={i} sx={{width:'100%'}}
            >
            {i > 2 ? (
              <Box>
                  <Card sx={{ height: '120px',width:'100%', display: 'flex',backgroundColor:'#2f105b',flexDirection: 'row',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6 }}}
               >
                <CardMedia
                  src={process.env.NEXT_PUBLIC_HOST_SERVICE + "/images/tournaments/" +torneo._idImg}
                  component="img"
                  sx={{ width: 200 }}
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
                            
                            <Typography variant="body2" color="white" sx={{ mb: 1, marginBottom:'10px'}}>
                                Precio de Inscripción: <strong>{torneo.amount}</strong>
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1,color:"white" }}>
                                Fecha: {new Date(torneo.startDate).toLocaleString()}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1,color:"white" }}>
                                Jugadores: /{torneo.quotas} • {torneo.teamSpace} vs {torneo.teamSpace} 
                            </Typography>
                            
                    
                        </Box> 
                    </CardContent>
                    <CardActions sx={{ display: 'flex', flexDirection: 'row', marginLeft:'15px'}}>
                        <Button href={`/Torneos/${torneo._id}`} size="small" sx={{color:'white', borderRadius:'2px', borderColor:'white'}}> 
                            Ver detalles
                        </Button>
                        <Button href={`/Torneos/${torneo._id}/inscription`} size="small" variant="contained" sx={{backgroundColor:'#77589c',color:'white'}}>
                            Unirse
                        </Button>
                    </CardActions>
                </Box>
              </Card>
              </Box>
            ):(
              <Box></Box>
            )}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}