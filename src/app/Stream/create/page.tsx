'use client'
import React from 'react'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useCreateStream from './useCreateStream';


export default function page() {
    const createStream = useCreateStream({})
    return (
        <Box sx={{ display: "flex", flexDirection: "column", maxHeight: "auto", margin: "auto", width: "100%", marginTop: 8 }}>
            <Box sx={{ width: '100%', marginLeft: { xs: '2%', sm: '8%', md: '8%', lg: '20%', xl: '25%' }, marginTop: '50px' }}>
                <Tooltip title="Volver a Mi Perfil">
                    <IconButton
                        href={`/dashboard`}
                        color="secondary"
                        aria-label="Volver a Mi Perfil"
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.04)'
                            }
                        }}
                    >
                        <ArrowBackIcon />
                        <Typography>Volver a Mi Perfil</Typography>
                    </IconButton>
                </Tooltip>
            </Box>
            <Box sx={{ paddingBottom: '100px', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                {createStream.reactForm}
            </Box>
        </Box>
    )
}
