'use client'
import React from 'react'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import useCreateTorneo from '../dashboard/useCreateTorneo';

export default function page() {
    const createTorneoHook = useCreateTorneo({
            callback() {
                createTorneoHook.reset()
            },
        })
  return (
    <Box sx={{display: "flex", flexDirection: "column", maxHeight: "80vh", margin: "auto", width: "100%", marginTop:8}}>
      <Box sx={{width:'100%', marginLeft:{xs:'2%',sm:'8%',md:'8%',lg:'20%', xl:'25%'}, marginTop:'50px'}}>
        <Tooltip title="Volver a Mi Pagina">
          <IconButton 
            href={`/dashboard`}
            color="secondary"
            aria-label="Volver a Mi Pagina"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <ArrowBackIcon />
            <Typography>Volver a Mi Pagina</Typography>
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{  flex: 1, overflowY: "auto",  '&::-webkit-scrollbar': { width: '6px',},
        '&::-webkit-scrollbar-thumb': { backgroundColor: 'white',  borderRadius: '3px', } }}>
           {createTorneoHook.reactForm}
      </Box>
    </Box>
  )
}
