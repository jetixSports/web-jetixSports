import * as React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import Image from 'next/image';

export default function Footer() {
  return (
    <Box component="footer" sx={{ backgroundColor: '#060620', color: 'White', py: 3, }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 3, height: "70px" }}>

          <Box sx={{ width: "fitContent", height: "70px", display: 'flex', alignContent: "center", justifyContent: "Center" }}>
            <Box sx={{ height: '60px', width: '75px' }}>
              <Image
                height={40}
                width={80}
                src="/assets/logos/backTransparent.png"
                alt="logo"
                className='w-full h-full'
              />
            </Box>

            <Typography variant="h6" fontWeight="bold" sx={{ textWrap: 'nowrap', marginY: 'auto' }}>
              JETIX SPORT
            </Typography>
          </Box >


          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton aria-label="Facebook" sx={{
              color: 'white',
              '&:hover': { color: '#1877F2', backgroundColor: 'rgba(24, 119, 242, 0.1)' }
            }}
             onClick={() => { window.open('https://www.facebook.com/share/1FSwb2f3o6/', '_blank') }}>
              <FacebookIcon fontSize="medium" />
            </IconButton>

            <IconButton aria-label="Twitter" sx={{
              color: 'white',
              '&:hover': { color: '#ffffffff', backgroundColor: 'rgba(29, 161, 242, 0.1)' }
            }}
              onClick={() => { window.open('https://x.com/JetixSport', '_blank') }}
            >
              <XIcon fontSize="medium" />
            </IconButton>

            <IconButton aria-label="WhatsApp" sx={{
              color: 'white',
              '&:hover': { color: '#25D366', backgroundColor: 'rgba(37, 211, 102, 0.1)' }
            }}
              onClick={() => { window.open('https://whatsapp.com/channel/0029VbANtekEgGfEAaZPvG02', '_blank') }}
            >
              <WhatsAppIcon fontSize="medium" />
            </IconButton>

            <IconButton aria-label="Instagram" sx={{
              color: 'white',
              '&:hover': {
                background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
                color: 'white'
              }
            }}
              onClick={() => { window.open('https://www.instagram.com/jetixsport/?igsh=MW9wZjh2ZmVhaHByNg%3D%3D#', '_blank') }}
            >
              <InstagramIcon fontSize="medium" />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ mt: 1, textAlign: 'center', color: 'white' }}>
          © {new Date().getFullYear()} JETIX SPORT. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
}