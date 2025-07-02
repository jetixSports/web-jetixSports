'use client'
import React from 'react'
import { Box, Typography, Card, CardActionArea, CardContent, IconButton } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram'
import EmailIcon from '@mui/icons-material/Email'


export default function CardContacos() {

    const [selectedCard, setSelectedCard] = React.useState(0);
    const cards = [
        {
            id: 1,
            title: 'Facebook',
            description: 'JetixSport',
            url:'https://ejmplo.com',
            logo:<FacebookIcon sx={{ fontSize: 40, color: 'white',
              '&:hover': { 
                borderRadius:'10px',
                color: '#1877F2', 
                backgroundColor: 'rgba(24, 119, 242, 0.1)' }}}/>
        },
        {
            id: 2,
            title: 'Twitter',
            description: '@JetixSport',
            url:'https://ejmplo.com',
            logo:<TwitterIcon sx={{ fontSize: 40, color: 'white',
              '&:hover': { color: '#1DA1F2', 
                 borderRadius:'5px',
                 backgroundColor: 'rgba(29, 161, 242, 0.1)'}}} />
        },
        {
            id: 3,
            title: 'WhatsApp',
            description: '+58 412 657 89 63',
            url:'https://ejmplo.com',
            logo:<WhatsAppIcon sx={{ fontSize: 40, color: 'white',
              '&:hover': { color: '#25D366', 
                borderRadius:'5px',
                backgroundColor: 'rgba(37, 211, 102, 0.1)' }}} />
        },
        {
            id: 4,
            title: 'Instagram',
            description: '@JetixSport.',
            url:'https://ejmplo.com',
            logo:<InstagramIcon sx={{ fontSize: 40, color: 'white',
              '&:hover': {
                borderRadius:'10px',
                background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
                color: 'white'
              }}} />
        },
        {
            id: 5,
            title: 'Gmail',
            description: 'JetixSport@gmail.com',
            logo: <EmailIcon sx={{ fontSize: 40, color: 'white',
              '&:hover': {
                borderRadius:'10px',
                background: ' #EA4335 10%',
                color: 'white'
            }}} />
        }
    ];


  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
        gap: 2,
        justifyContent:'center',
        textAlign:'center'
      }}
    >
      {cards.map((card, index) => (
        <Card>
          <CardActionArea
            onClick={() => {card.url}}
            sx={{
              height: '100%',
              width:'200px',
                backgroundColor: '#77589C',
                '&:hover': {
                  backgroundColor: '#77589C',
                },
            }}
          >
            <CardContent sx={{ height: '100%' }}>
                <IconButton aria-label="next">
                {card.logo}
                </IconButton>
              <Typography variant="h5" component="div" sx={{color:'#B9B9B9'}}>
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{color:'#B9B9B9'}} >
                {card.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}
