'use client'
import * as React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, useMediaQuery, Box, Button, Container } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import CallIcon from '@mui/icons-material/Call';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isSmall = useMediaQuery('(max-width:1060px)'); 

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar 
      position="fixed"
      sx={{ 
        alignContent:"center",
        width:"90%",
        backgroundColor: '#440079',
        margin:"0 5%",
        padding:"0px",
        height:"65px",
        borderRadius:"50px",
        display:"flex",
        boxShadow: '0px 10px 30px rgb(117, 0, 163)',
        top: "15px",
        zIndex: "100",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{transition: 'all 0.3s ease'}}>
          <Box sx={{display:"flex",flexDirection:"row", alignContent:"center"}}>
            <Box sx={{width:"50px",height:"100%", }}>
              <Image 
                src="/assets/logos/backWhite.jpg"
                alt="logo" 
                height={64}
                width={64}
              />
            </Box>
            <Box sx={{marginLeft:"10px", alignContent:"center"}}>
              <Typography variant="h6" noWrap component="a" href="/" 
                sx={{
                  mr: 2,
                  display: 'flex',
                  fontFamily: 'monospace',
                  fontSize:"16px",
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}>
                JETIX SPORT
              </Typography>
            </Box>
          </Box>

          {isSmall ? (
            
            <Box sx={{justifyContent:"Right", display:"flex",  width:"650px"}}>
              
              <Box sx={{ flexGrow: 0, alignContent:"center"}}>

                <Button 
                  color="inherit" 
                  sx={{ textTransform: 'none' }}
                  href='/sign-up'>
                  Registrarme
                </Button>

                <Button 
                  variant="contained" 
                  sx={{  
                    backgroundColor: 'white',
                    marginRight:"10px",
                    color:"#00003D", 
                    textTransform: 'none', 
                    borderColor: 'white',
                    '&:hover': {
                      backgroundColor: '#6A00FF', 
                      color:"white"
                    }
                  }} 
                  href='/login'
                >
                  Iniciar sesión
                </Button>
              </Box>
              <Box sx={{ alignContent:"center"}}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenuOpen}
                  sx={{left: theme.spacing(2)}}>
                  <MenuIcon fontSize="large"/>
                </IconButton>
              
                <Menu
                  id="mobile-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMenuClose}  href='/Torneos'>
                    <SportsEsportsIcon sx={{ mr: 1 }} />
                    Torneos
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}  href='/Stream'>
                    <LiveTvIcon sx={{ mr: 1 }} />
                    Stream Activos
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}  href='/Contactos'>
                    <CallIcon sx={{ mr: 1 }} />
                    Contactos
                  </MenuItem>
                </Menu>
              </Box>
            </Box> 
            
          ) : (
            <>
              <Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 4, alignContent:"center" }}>
                <Button 
                  color="inherit" 
                  startIcon={<SportsEsportsIcon />} 
                  sx={{ textTransform: 'none' }}
                  href='/Torneos'
                >
                  Torneos
                </Button>
                
                <Button 
                  color="inherit" 
                  startIcon={<LiveTvIcon />} 
                  sx={{ textTransform: 'none' }}
                  href='/Stream'
                >
                  Stream Activos
                </Button>
                
                <Button 
                  color="inherit" 
                  startIcon={<CallIcon />} 
                  sx={{ textTransform: 'none' }}
                  href='/Contactos'
                >
                  Contactos
                </Button>
              </Box>

              <Box sx={{ flexGrow: 0 }}>

                <Button 
                  color="inherit" 
                  sx={{ textTransform: 'none' }}
                  href='/sign-up'>
                  Registrarme
                </Button>

                <Button 
                  variant="contained" 
                  sx={{  
                    backgroundColor: 'white',
                    marginRight:"10px",
                    color:"#00003D", 
                    textTransform: 'none', 
                    borderColor: 'white',
                    '&:hover': {
                      backgroundColor: '#6A00FF', 
                      color:"white"
                    }
                  }} 
                  href='/login'
                >
                  Iniciar sesión
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}