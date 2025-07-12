'use client'
import * as React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, useMediaQuery, Box, Button, Container, Divider, ListItemIcon } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import CallIcon from '@mui/icons-material/Call';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import UserIcon from '../../UX/UserIcon/UserIcon';
import { Logout, Mail, Person } from '@mui/icons-material';
import useFetch from '@/src/app/hooks/useFetch';
import ArticleIcon from '@mui/icons-material/Article';
import AddCardIcon from '@mui/icons-material/AddCard';
import GroupIcon from '@mui/icons-material/Group';

export default function NavBar() {
  const { get } = useFetch()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { data: session, } = useSession();
  const user = session?.user;
  const theme = useTheme();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (e: any) => {
    const href = e.target.getAttribute('href')
    if (href)
      router.push(href)
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        alignContent: "center",
        width: "90%",
        backgroundColor: '#440079',
        margin: "0 5%",
        padding: "0px",
        height: "65px",
        borderRadius: "50px",
        display: "flex",
        boxShadow: '0px 10px 30px rgb(117, 0, 163)',
        top: "15px",
        zIndex: "100",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ transition: 'all 0.3s ease' }}>
          <Box sx={{ display: "flex", flexDirection: "row", alignContent: "center" }}>
            <Box sx={{ width: "60px", height: "64px", margin:'3px 5px 0 0', justifyContent:'center',alignContent:'center'}}>
              <Image
                src="/assets/logos/backTransparent.png"
                alt="logo"
                height={50}
                width={70}
              />
            </Box>
            <Box sx={{ alignContent: "center", height:'65px', margin:'0 0 0 5px' }}>
              <Typography variant="h6" noWrap component="a" href="/"
                sx={{
                  display: 'flex',
                  fontFamily: 'monospace',
                  fontSize: "16px",
                  color: 'inherit',
                  textDecoration: 'none',
                }}>
                JETIX SPORT
              </Typography>
            </Box>
          </Box>

          {!user && <>
            {/* Opciones pantalla pequena */}
            < Box sx={{ justifyContent: "Right", display: { xs: "flex", md: "none" }, width: "650px" }}>

              <Box sx={{ display: { xs: 'none', sm: 'block' }, flexGrow: 0, alignContent: "center" }}>

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
                    marginRight: "10px",
                    color: "#00003D",
                    textTransform: 'none',
                    borderColor: 'white',
                    '&:hover': {
                      backgroundColor: '#6A00FF',
                      color: "white"
                    }
                  }}
                  href='/login'
                >
                  Iniciar sesión
                </Button>
              </Box>
              <Box sx={{ alignContent: "center" }}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenuOpen}
                  sx={{ left: theme.spacing(2), marginRight: 2 }}>
                  <MenuIcon fontSize="large" />
                </IconButton>

                <Menu
                  id="mobile-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMenuClose} href='/Torneos'>
                    <SportsEsportsIcon sx={{ mr: 1 }} />
                    Torneos
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose} href='/Stream'>
                    <LiveTvIcon sx={{ mr: 1 }} />
                    Stream Activos
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose} href='/Contactos'>
                    <CallIcon sx={{ mr: 1 }} />
                    Contactos
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose} href='/login'>
                    Iniciar sesión
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose} href='/sing-up'>
                    Registrarme
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
            {/* Opciones pantalla grande */}

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignContent: "center",  height:'65px' }}>
              <Button
                color="inherit"
                startIcon={<SportsEsportsIcon />}
                sx={{ textTransform: 'none', marginLeft: "auto" }}
                href='/Torneos'
              >
                Torneos
              </Button>

              <Button
                color="inherit"
                startIcon={<LiveTvIcon />}
                sx={{ textTransform: 'none', textWrap: 'nowrap', marginLeft: { lg: 4 } }}
                href='/Stream'
              >
                Streams
              </Button>

              <Button
                color="inherit"
                startIcon={<CallIcon />}
                sx={{ textTransform: 'none', marginRight: "auto", marginLeft: { lg: 4 } }}
                href='/Contactos'
              >
                Contactos
              </Button>
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
                  marginRight: "10px",
                  marginY: 'auto',
                  color: "#00003D",
                  textTransform: 'none',
                  borderColor: 'white',
                  textWrap: 'nowrap',
                  height: 'fit-content',
                  '&:hover': {
                    backgroundColor: '#6A00FF',
                    color: "white"
                  }
                }}
                href='/login'
              >
                Iniciar sesión
              </Button>
            </Box>
          </>}
          {user && <>
            {/* Opciones pantalla pequena */}
            < Box sx={{ justifyContent: "Right", display: { xs: "flex", md: "none" }, width: "650px" }}>

              <Box sx={{ alignContent: "center" }}>
                <Box
                  onClick={handleMenuOpen}
                  sx={{ display: 'flex', cursor: 'pointer' }}
                >
                  <Typography sx={{ marginY: 'auto', display: { xs: 'none', sm: 'block' } }}>
                    {user.firstName} {user.lastName}
                  </Typography>
                  <UserIcon src={user?._idImg ? '/images/profile/' + user._idImg : undefined} sx={{ height: '32px', width: '32px', m: 1 }}></UserIcon>
                </Box>
                <Menu
                  sx={{ display: { xs: "flex", md: "none" } }}
                  id="mobile-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem >
                    {user.firstName} {user.lastName}
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleMenuClose} href='/Profile'>
                    <Person sx={{ mr: 1 }} />
                    Tu perfil
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose} href='/invitations'>
                    <Mail sx={{ mr: 1 }} />
                    Invitaciones
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose} href='/Torneos'>
                    <SportsEsportsIcon sx={{ mr: 1 }} />
                    Torneos
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose} href='/Stream'>
                    <LiveTvIcon sx={{ mr: 1 }} />
                    Stream Activos
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose} href='/Contactos'>
                    <CallIcon sx={{ mr: 1 }} />
                    Contactos
                  </MenuItem>
                  {user?.role == "admin" && <MenuItem onClick={handleMenuClose} href='/admin/usersList'>
                    <GroupIcon sx={{ mr: 1 }}/>
                    Lista de Usuarios
                  </MenuItem>}
                  {user?.role == "organizer" || user?.role == "admin" && <MenuItem onClick={handleMenuClose} href='/MethodPay'>
                  <AddCardIcon sx={{ mr: 1 }}/>
                  Mis metodos de pago
                </MenuItem>}
                  <MenuItem onClick={handleMenuClose} href='/dashboard'>
                    <ArticleIcon sx={{ mr: 1 }}/>
                    Mi Página
                  </MenuItem>
                  <MenuItem onClick={async () => {
                    const data = await get(process.env.NEXT_PUBLIC_HOST_SERVICE + '/auth/logout')
                    await signOut()
                    window.location.href = '/'
                  }} >
                    <Logout sx={{ mr: 1 }} />
                    Cerrar sesion
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
            {/* Opciones pantalla grande */}

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignContent: "center" }}>
              <Button
                color="inherit"
                startIcon={<SportsEsportsIcon />}
                sx={{ textTransform: 'none', marginLeft: "auto" }}
                href='/Torneos'
              >
                Torneos
              </Button>

              <Button
                color="inherit"
                startIcon={<LiveTvIcon />}
                sx={{ textTransform: 'none', textWrap: 'nowrap', marginLeft: { lg: 4 } }}
                href='/Stream'
              >
                Streams
              </Button>

              <Button
                color="inherit"
                startIcon={<CallIcon />}
                sx={{ textTransform: 'none', marginRight: "auto", marginLeft: { lg: 4 } }}
                href='/Contactos'
              >
                Contactos
              </Button>
              <Box
                onClick={handleMenuOpen}
                sx={{ display: 'flex', cursor: 'pointer' }}
              >
                <Typography sx={{ marginY: 'auto', display: { xs: 'none', sm: 'block' } }}>
                  {user.firstName} {user.lastName}
                </Typography>
                <UserIcon src={user?._idImg ? '/images/profile/' + user._idImg : undefined} sx={{ height: '32px', width: '32px', m: 1 }}></UserIcon>
              </Box>
              <Menu
                sx={{ display: { md: "flex", xs: "none" } }}
                id="mobile-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose} href='/Profile'>
                  <Person sx={{ mr: 1 }} />
                  Tu perfil
                </MenuItem>
                <MenuItem onClick={handleMenuClose} href='/invitations'>
                  <Mail sx={{ mr: 1 }} />
                  Invitaciones
                </MenuItem>
                {user?.role == "admin" && <MenuItem onClick={handleMenuClose} href='/admin/usersList'>
                    <GroupIcon sx={{ mr: 1 }}/>
                    Lista de Usuarios
                  </MenuItem>}
                  {user?.role == "organizer" || user?.role == "admin" && <MenuItem onClick={handleMenuClose} href='/MethodPay'>
                  <AddCardIcon sx={{ mr: 1 }}/>
                  Mis metodos de pago
                </MenuItem>}
                  <MenuItem onClick={handleMenuClose} href='/dashboard'>
                    <ArticleIcon sx={{ mr: 1 }}/>
                    Mi Página
                  </MenuItem>
                <MenuItem onClick={async () => {
                  const data = await get(process.env.NEXT_PUBLIC_HOST_SERVICE + '/auth/logout')
                  await signOut()
                  window.location.href = '/'
                }} >
                  <Logout sx={{ mr: 1 }} />
                  Cerrar sesion
                </MenuItem>
              </Menu>
            </Box>
          </>}
        </Toolbar>
      </Container>
    </AppBar >
  );
}
