import * as React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import CallIcon from '@mui/icons-material/Call';

export default function NavBar() {
  return (
    <AppBar 
      position="fixed"
      sx={{ 
        alignContent:"center",
        width:"90%",
        backgroundColor: '#440079',
        margin:"0 5%",
        padding:"10px",
        borderRadius:"50px",
        boxShadow: '0px 10px 30px rgb(105, 69, 150)',
        top: "15px",
        zIndex: "100",
        
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo/Nombre */}
          <Typography variant="h6" noWrap component="a" href="/" 
            sx={{
              mr: 2,
              display: 'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            JETIX SPORT
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 4 }}>
            <Button color="inherit" startIcon={<SportsEsportsIcon />} sx={{ textTransform: 'none' }}
                href=''>
              Torneos
            </Button>
            
            <Button color="inherit" startIcon={<LiveTvIcon />} sx={{ textTransform: 'none' }}
                href=''>
              Stream Activos
            </Button>
            
            <Button color="inherit" startIcon={<CallIcon />} sx={{ textTransform: 'none' }}
                href=''>
              Contactos
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button color="inherit" sx={{ textTransform: 'none' }}
                href='/sign-up'>
              Registrarme
            </Button>
            <Button variant="contained" sx={{  backgroundColor: 'white',marginRight:"10px" , color:"#00003D", textTransform: 'none', borderColor: 'white',
                '&:hover': {backgroundColor: '#6A00FF', color:"white"}}} 
                href='/login'>
              Iniciar sesión
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}