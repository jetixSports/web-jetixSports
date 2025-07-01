'use client';
import React from "react";
import { Box, Card, Typography, Button } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';

import CardTorneosDestacados from "./components/UX/Card/CardTorneosDestacados";
import BoxHeader from "./components/UX/Box/Box";
import GameCarusel from "./components/UX/Box/Carusel";
import Background from "./components/UX/Background/Background";
import Buttons from "./components/UX/Buttons/Buttons";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, } = useSession();
  const user = session?.user;
  return (
    <Box>

      <BoxHeader>
        <Background src="./backgrounds/torneo.svg"></Background>
        <Box sx={{color:'white', margin:'220px 0  0 100px'}}>

          <Typography variant="h4" sx={{fontWeight: 'bold',marginBottom:'10px'}}>
            Disfruta de tus Torneos Favoritos</Typography>
          <Typography>Diseñada para los verdaderos competidores y fans. </Typography>
          <Typography>Disfruta streaming en vivo de torneos de eSports y deportes físicos,</Typography>
          <Typography> y descubre eventos exclusivos, todo en un solo lugar. </Typography>
          
          {!user && <Box sx={{marginTop:'20px'}}>
            <Buttons sx={{color:'#00003d',backgroundColor:'white', p:'20px'}} href="/sign-up">Registrate</Buttons>
          </Box>}
        </Box>
        <Box>
          <Typography variant="h4" sx={{fontWeight: 'bold',color: 'white', marginTop:'100px',marginLeft:'100px'}}>
            JUEGOS
          </Typography>
        </Box>
        <Box>
          <GameCarusel></GameCarusel>
        </Box>
      </BoxHeader >



      <Box sx={{height:'600px',backgroundColor:'#00003d', padding:'20px',alignContent:'center'}}>
        <Box sx={{p:'30px', display:'flex',height:'50px'}}>
          <Typography variant="h4" sx={{fontWeight: 'bold',color: 'white',marginLeft:'100px'}}>
            Descubre Nuestros Servicios
          </Typography>
        </Box>        
        <Box  sx={{height:'400px', backgroundColor:'#00003d', display:'flex', flexDirection:'colunm', justifyContent:'center'}}>

          <Box sx={{width:'600px', alignContent:'center'}}>
            <Typography variant="h6" sx={{color: 'white',marginLeft:'100px'}}>
              Acceso a Streaming en Vivo
            </Typography>
            <Typography variant="body2" sx={{color: 'white',marginLeft:'100px',marginBottom:'10px'}}>
              Disfruta de la transmisión en directo de torneos en sus plataformas oficiales. 
              Encuentra el enlace para seguir el torneo en la descripción del evento.
            </Typography>
            <Typography variant="h6" sx={{color: 'white',marginLeft:'100px'}}>
              Participa en Torneos
            </Typography>
            <Typography variant="body2" sx={{color: 'white',marginLeft:'100px',marginBottom:'10px'}}>
             Demuestra tus habilidades y compite contra los mejores jugadores en emocionantes torneos.
            </Typography>
            <Typography variant="h6" sx={{color: 'white',marginLeft:'100px'}}>
              Organiza Torneos
            </Typography>
            <Typography variant="body2" sx={{color: 'white',marginLeft:'100px'}}>
              ¿Quieres crear tu propio Torneos?Únete a nuestra plataforma con una cuenta de Organizador y forma parte de la revolución del gaming y del deporte competitivo.
            </Typography>
          </Box>

          <Box sx={{width:'600px', marginLeft:'40px', alignContent:'center'}}>
            <Card sx={{ maxWidth: 500,height: 340 }}>
              <CardMedia
                sx={{ height: 340}}
                image='./assets/img/valorant.png'/>
            </Card>
          </Box>

        </Box>
      </Box>



      <Box sx={{height:'auto',  marginTop:'100px'}}>
        <Box sx={{p:'30px', display:'flex'}}>
          <Typography variant="h4" sx={{fontWeight: 'bold',color: 'white',marginLeft:'100px'}}>
            Torneos Proximos
          </Typography>
        </Box>

        <Box sx={{width:'100%',display:"flex",flexDirection:'row',justifyContent:"center"}}>
          <CardTorneosDestacados></CardTorneosDestacados>
        </Box>
        <Box sx={{width:'100%',display:"flex",flexDirection:'row',justifyContent:"center", margin:'20px 0 40px 0'}}>
          <Buttons href='/Torneos' sx={{backgroundColor:'#20105b',color:'#fff', padding:' 25px 40px'}}>Ver mas</Buttons>
        </Box>
      </Box>

      <Box sx={{height:'300px',width:'91%', backgroundColor:'#00003d', padding:'20px 60px',display:'flex',justifyContent:'center', flexDirection:'column', textAlign:'center'}}>
        <Typography variant="h4" sx={{fontWeight: 'bold',color: 'white'}}>
            Quieres Organizar un Torneo?
        </Typography>
        <Typography variant="body2" sx={{color: 'white', marginTop:'15px'}}>
          Contacta con nuestro equipo para obtener un cuenta de Organizador
          </Typography>
        <Box sx={{display:'flex', justifyContent:'center', marginTop:'15px'}}>
          <Buttons href='/Contactos' sx={{backgroundColor:'#ffffff',color:'#00003d', padding:'20px'}}>Haz click aqui</Buttons>
        </Box>  
      </Box>

    </Box >
  );
}
