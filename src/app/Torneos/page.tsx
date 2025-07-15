'use client';
import React, { useState } from "react";
import { Box, Dialog, DialogActions, DialogContent, Typography, DialogTitle,
  MenuItem, Select, Link
} from "@mui/material";

import Background from "../components/UX/Background/Background";
import BoxHeader from "../components/UX/Box/Box";
import CardTorneosDestacados from "../components/UX/Card/CardTorneosDestacados";
import CardTorneosProximos from "../components/UX/Card/CradTorneos";
import useCreateTorneo from "../(auth)/dashboard/useCreateTorneo";
import { CancelOutlined } from "@mui/icons-material";

export default function Torneos() {

  const [showModalCreate, setShowModalCreate] = useState(false)
    const createTorneoHook = useCreateTorneo({
        callback() {
            createTorneoHook.reset()
            setShowModalCreate(false)
        },
    })
  return (
    <Box sx={{ margin:'0'}}>
        {showModalCreate && <Box onClick={() => {
                      setShowModalCreate(false),
                          createTorneoHook.reset()
                  }} sx={{
                      zIndex: 10, position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backdropFilter: "blur(5px)", display: "flex",
                      justifyContent: "center", alignItems: "flex-start", overflow: "hidden"
                  }}>
      
                      <Box sx={{
                          marginTop: 15, maxHeight: "75vh", display: "flex", flexDirection: "column",
                          borderRadius: "10px", position: "relative", overflow: "hidden"
                      }} onClick={(e) => e.stopPropagation()}>
                          <Box sx={{
                               flex: 1, overflowY: "auto", '&::-webkit-scrollbar': { width: '6px', },
                              '&::-webkit-scrollbar-thumb': {
                                  backgroundColor: 'white', borderRadius: '3px',
                              }
                          }}>
                              <Box sx={{ position: "relative", width: "100%", display: 'flex', justifyContent: "end" }}>
                                  <Box sx={{ position: "absolute", marginY: 4, marginX:4 }}>
                                      <CancelOutlined onClick={() => {
                                          setShowModalCreate(false)
                                          createTorneoHook.reset()
                                      }} sx={{ color: "white", cursor: "pointer" }}>
                                      </CancelOutlined>
                                  </Box>
                              </Box>
                              {createTorneoHook.reactForm}
                          </Box>
                      </Box>
                  </Box>}
      <BoxHeader>
        <Background  sx={{backgroundColor: "#00003D"}} src="./backgrounds/torneo.svg"></Background>
        <Box sx={{color:'white', margin:'220px 0  0 100px'}}>

          <Typography variant="h4" sx={{fontWeight: 'bold',marginBottom:'10px'}}>
           Torneos</Typography>
          <Typography>¿Quieres convertirte en un competidor o quieres ser el que trae a la competencia? </Typography>
          <Typography>Si es así, ¡estas en lugar correcto! </Typography>
          <Typography>Jetix Sports ofrece acceso a torneos exclusivos en tus videojuegos favoritos. </Typography>    
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
    </Box>
    
  )
}
