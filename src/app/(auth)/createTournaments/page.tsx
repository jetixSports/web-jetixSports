'use client'
import React from 'react'
import { Box } from '@mui/material'

import useCreateTorneo from '../dashboard/useCreateTorneo';

export default function page() {
    const createTorneoHook = useCreateTorneo({
            callback() {
                createTorneoHook.reset()
            },
        })
  return (
    <Box sx={{display: "flex", flexDirection: "column", borderRadius: "10px", position: "relative", overflow: "hidden", maxHeight: "80vh", margin: "auto", width: "100%", marginTop:8}}>
      <Box sx={{  flex: 1, overflowY: "auto",  '&::-webkit-scrollbar': { width: '6px',},
        '&::-webkit-scrollbar-thumb': { backgroundColor: 'white',  borderRadius: '3px', } }}>
           {createTorneoHook.reactForm}
      </Box>
    </Box>
  )
}
