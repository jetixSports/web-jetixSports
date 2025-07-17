import React from 'react';
import { Box, Card, Typography, Button, CardMedia, CardContent, CardActions,
  Chip, LinearProgress, Container, 
  CircularProgress,
  Alert} from "@mui/material";
import usePage from '../../../usePage';
import useStream from '../../../Stream/useStream';

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
export default function CardStream() {
  const { TorneoDes, loading, error } = usePage();
  const { stream } = useStream();

  const streamMap: StreamMap = stream.reduce((acc: StreamMap, curr: Stream) => {
    acc[curr.torneoId] = curr;
    return acc;
  }, {});

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

          {TorneoDes.map((torneo, i) => {
            
            const torneoStream = streamMap[torneo._id];
            
            return (
              <Box>
                {torneoStream?.URL ? (
                
                  <Box key={i} sx={{ width: '100%' }}>
                  <Card sx={{ 
                    height: '120px',
                    width: '100%', 
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
                      src={process.env.NEXT_PUBLIC_HOST_SERVICE + "/images/tournaments/" + torneo._idImg}
                      component="img"
                      sx={{ width: 200 }}
                      alt={torneo.name}
                    />
                    <Box sx={{ flexGrow: '1', display: 'flex', flexDirection: 'row' }}>
                      <CardContent sx={{ display: 'flex', flexDirection: 'row'}}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '400px', justifyContent:'center' }}>
                          <Typography gutterBottom variant="h5" component="div" sx={{ color: "white" }}>
                            {torneo.name}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                            <Chip label={torneo.typeSport} sx={{ color: "white" }} size="small" />
                          </Box>
                        </Box>

                        {/* <Box sx={{ display: 'flex', justifyContent:'center', flexDirection: 'column', width:'300px' }}>   
                          <Typography variant="body2" sx={{ mb: 1, color: "white" }}>
                            Jugadores: {Players || 0} • {torneo.teamSpace} vs {torneo.teamSpace} 
                          </Typography>
                        </Box>  */}

                      </CardContent>
                      <CardActions sx={{ display: 'flex', flexDirection: 'row', marginLeft: '15px' }}>
                      
                          <Button 
                            onClick={() => window.open(torneoStream.URL, '_blank')} 
                            sx={{ backgroundColor: '#77589c', color: 'white' }}
                          >
                            Ir al Stream
                          </Button>
                      </CardActions>
                    </Box>
                  </Card>
                  </Box>
                ):(
                  <Box></Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}