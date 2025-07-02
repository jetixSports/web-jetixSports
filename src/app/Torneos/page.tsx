'use client';
import React, { useState } from "react";
import { Box, Dialog, DialogActions, DialogContent, Typography, DialogTitle,
  MenuItem, Select, Link
} from "@mui/material";

import Background from "../components/UX/Background/Background";
import BoxHeader from "../components/UX/Box/Box";
import CardTorneosDestacados from "../components/UX/Card/CardTorneosDestacados";
import CardTorneosProximos from "../components/UX/Card/CradTorneos";
import Form from "../components/UX/Form/Form";
import Buttons from "../components/UX/Buttons/Buttons";
import Inputs from "../components/UX/Inputs/Inputs";
import { useSession } from "next-auth/react";

export default function Torneos() {
  const { data: session } = useSession();
  
  const user = session?.user
  const rol = user?.role;
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const juegosOptions = [
    { value: 'Valorant', label: 'Valorant' },
    { value: 'League of Legends', label: 'League of Legends' },
    { value: 'FIFA', label: 'FIFA' },
    { value: 'Pokemon', label: 'Pokemon' },
    { value: 'Caida', label: 'Caida' },
  ]

  return (
    <Box sx={{ margin:'0'}}>
      <BoxHeader>
        <Background src="./backgrounds/torneo.svg"></Background>
        <Box sx={{color:'white', margin:'220px 0  0 100px'}}>

          <Typography variant="h4" sx={{fontWeight: 'bold',marginBottom:'10px'}}>
            Disfruta de tus Torneos Favoritos</Typography>
          <Typography>Diseñada para los verdaderos competidores y fans. </Typography>
          <Typography>Disfruta streaming en vivo de torneos de eSports y deportes físicos,</Typography>
          <Typography> y descubre eventos exclusivos, todo en un solo lugar. </Typography>
          
          {rol === 'organizer' ? (
            <Buttons variant="contained" onClick={handleOpen} sx={{marginTop:'15px', borderRadius:'6px', backgroundColor:'white', color:'#00003d'}}>
            Crear Torneo
            </Buttons>
          ) : (
            <Typography>Obten una cuenta organizador para crear torneos</Typography>
          )}
                  
        </Box>
        <Box>
          <Typography variant="h4" sx={{fontWeight: 'bold',color: 'white', marginTop:'100px',marginLeft:'100px'}}>
            Torneos Destacados
          </Typography>
        </Box>
      </BoxHeader>

        <Box  sx={{padding:'40px',background:'#00003d'}}>
            <CardTorneosDestacados/>
        </Box>

        <Box>
            <Box>
                <Typography variant="h4" sx={{fontWeight: 'bold',color: 'white', marginTop:'100px',marginLeft:'100px'}}>
                    Torneos Proximos
                </Typography>
            </Box>
            <Box>
                <CardTorneosProximos/>
            </Box>
        </Box>

  <Dialog open={open} onClose={handleClose}>
    <DialogTitle sx={{backgroundColor:'#00003d',color:'white', height:'auto', width:'auto'}}>
      <Typography sx={{ fontWeight: 'bold', color: "white", textAlign: "center", fontSize: 24 }}>
        Crear Torneo
      </Typography>
    </DialogTitle>

    <Box sx={{width:'100%', height:'1000px',display:'flex', justifyContent:'center'}}>
        <DialogContent sx={{backgroundColor:'#00003d',color:'white', height:'auto', width:'auto'}}>
          <Form styles={{ form: { width:'100%' } }} handleSubmit={undefined}>
            <Box sx={{ width: "100%", gap: 2, display: 'flex', flexDirection: "column" }}>

                <Box sx={{ width: "100%",display: 'flex', flexDirection: "row"}}>
                    <Box sx={{width:'100%',display: 'flex', flexDirection: "column"}}>
                        <Typography sx={{ marginY: 1, fontWeight: 'bold', color: "white", fontSize:14}}>
                          Nombre del Torneo
                        </Typography>
                        <Inputs sx={{ width: "100%", height: 36}}
                            placeholder="   Ej. Torneo Free Fire T2 C2"
                        />
                    </Box>

                    <Box  sx={{width:'60%',display: 'flex', flexDirection: "column"}}>
                        <Typography sx={{ marginY: 1, fontWeight: 'bold', color: "white", fontSize:14}}>
                            Selecciona el Juego
                        </Typography>
                        <Select
                        sx={{ width: "98%", marginTop:'4px', height: 36, marginLeft:'6%', backgroundColor:'#20105B',
                             borderRadius:"10px",color:'white'}}
                       
                        inputProps={{ 'aria-label': 'Seleccione un juego' }}
                        name="game"
                        
                        >
                            <MenuItem  value="">Seleccione un juego</MenuItem>
                            {juegosOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>

                </Box>

                <Inputs
                    multiline
                    rows={10}
                    sx={{ width: "100%" , height:'250px' }}
                    placeholder="   Detalles del Troneo"
                />
                <Box sx={{display: 'flex', flexDirection: "row"}}>
                    
                    <Box sx={{width:'100%',display: 'flex', flexDirection: "column"}}>
                        <Typography sx={{ marginY: 1, fontWeight: 'bold', color: "white", fontSize:14}}>
                          Precio de Inscripcion
                        </Typography>
                        <Inputs
                            type="number"
                            sx={{ width: "95%", height: 36, marginRight:"10px"}}
                            placeholder="  Dolares"
                        />
                    </Box>

                    <Box sx={{width:'100%',display: 'flex', flexDirection: "column"}}>
                        <Typography sx={{ marginY: 1, fontWeight: 'bold', color: "white", fontSize:14, marginLeft:'8%'}}>
                          Límite de Jugadores
                        </Typography>
                        <Inputs
                            type="number"
                            sx={{ width: "95%", height: 36, marginRight:"10px" }}
                            placeholder=" Ej. 80"
                        />
                    </Box>
                        
                    <Box sx={{width:'100%',display: 'flex', flexDirection: "column"}}>
                        <Typography sx={{ marginY: 1, fontWeight: 'bold', color: "white", fontSize:14, marginLeft:'8%'}}>
                          Jugadores por Equipo
                        </Typography>
                        <Inputs
                            type="number"
                            sx={{ width: "100%", height: 36}}
                            placeholder="  Ej. 1"
                        />
                    </Box>    
                </Box>
                  
                <Box sx={{display: 'flex', flexDirection: "row"}}>
                    <Box sx={{width:'100%',display: 'flex', flexDirection: "column"}}>
                        <Typography sx={{ marginY: 1, fontWeight: 'bold', color: "white", fontSize:14}}>
                          Fecha de Inicio  del Torneo
                        </Typography>
                        <Inputs
                            type="date"
                            sx={{ width: "98%", height: 36, color:'white'}}
                        />
                    </Box>
                    <Box sx={{width:'100%',display: 'flex', flexDirection: "column"}}>
                        <Typography sx={{ marginY: 1, fontWeight: 'bold', color: "white", fontSize:14, marginLeft:'8%'}}>
                          Fecha de Finalización
                        </Typography>
                        <Inputs
                            type="date"
                            sx={{ width: "100%", height: 36 }}

                        />
                    </Box>
                </Box>
                
                <Box sx={{width:'100%',display: 'flex', flexDirection: "column"}}>
                    <Typography sx={{ marginY: 1, fontWeight: 'bold', color: "white", fontSize:14}}>
                          Portada del Torneo
                    </Typography>
                    <Inputs
                        type="file"
                        sx={{ width: "100%" }}
                        inputProps={{ accept: "image/*" }}
                    />
                </Box>

                
                <Box sx={{ width: "100%", display: 'flex',justifyContent:'center' }}>
                    <Typography sx={{ display: "flex", fontSize: "15px", marginBottom: "0", marginRight: "5px", color: "white" }} variant="body2" gutterBottom>
                        Al crear el torneo aceptas las
                    </Typography>
                    <Link href="/Politicas" sx={{ fontSize: "15px" }} underline="hover" variant="body2">{'Politicas de Torneos'}</Link>
                </Box>

                
            </Box>
            <DialogActions sx={{backgroundColor:'#00003d',color:'white', height:'auto', width:'auto'}}>
                <Buttons onClick={handleClose} sx={{backgroundColor:'#C41C1F', color:"white", '&:hover': { 
                    backgroundColor:'#941A1C'
                }}}> Cerrar </Buttons>
                <Buttons onClick={handleClose} variant="contained">Crear</Buttons>
            </DialogActions>
        </Form>   
       </DialogContent>
    </Box>
  </Dialog>

</Box>
    
  )
}
