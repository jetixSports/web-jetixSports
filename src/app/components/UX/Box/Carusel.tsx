import React from 'react';
import { Box, Typography} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { styled } from '@mui/material/styles';

const GameCarusel = () => {

  const tournaments = [
    {
      id: 1,
      title: 'FIFA',
      image: './assets/img/lol.png',
    },
    {
      id: 2,
      title: 'Free Fire',
      image: './assets/img/valorant.png',
    },
    {
      id: 3,
      title: 'Call of Duty',
      image: './assets/img/valorant.png',
    },
    {
      id: 4,
      title: 'League of Legends',
      image: './assets/img/valorant.png',
    },
    {
      id: 5,
      title: 'Valorant',
      image: './assets/img/valorant.png',
    },
    {
      id: 6,
      title: 'Pokemón',
      image: './assets/img/lol.png',
    },
  ];

  const groupedTournaments = [];
  for (let i = 0; i < tournaments.length; i += 2) {
    groupedTournaments.push(tournaments.slice(i, i + 2));
  }

  const TournamentItem = styled(Box)({
    position: 'relative',
    borderRadius:3,
    overflow: 'hidden',
    height: 250,
    margin: '0 8px 30px',
    '&:hover': {
      transform: 'scale(1.02)',
      transition: 'transform 0.3s ease',
    },
  });

  const TournamentImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  });

  const TournamentTitle = styled(Box)({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(174, 0, 255, 0.7)',
    color: 'white',
    padding: 2,
    textAlign: 'center',
  });

  return (
    <Box sx={{ my: 4 }}>      
      <Carousel
        animation="fade"
        navButtonsAlwaysVisible
        indicators={false}
        sx={{
          maxWidth: 900,
          margin: '0 auto',
          '.MuiButtonBase-root': {
            color: 'white',
            backgroundColor: '#77589c',
            '&:hover': {
              backgroundColor: '#57397b',
            },
          },
        }}
      >
        {groupedTournaments.map((pair, index) => (
          <Box key={index} sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
            {pair.map((tournament) => (
              <TournamentItem key={tournament.id} sx={{ width: { xs: '100%', sm: '45%' } }}>
                <TournamentImage src={tournament.image} alt={tournament.title} />
                <TournamentTitle>
                  <Typography variant="subtitle1">{tournament.title}</Typography>
                </TournamentTitle>
              </TournamentItem>
            ))}
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default GameCarusel;