'use client'
import React from 'react'
import { Box, Card, CardMedia, CardActions, CardContent, Typography, Button, Chip } from '@mui/material'
import Background from '../components/UX/Background/Background';
import { useSession } from 'next-auth/react';
import UserIcon from '../components/UX/UserIcon/UserIcon';

export default function Profile() {
     const { data: session, } = useSession();
      const user = session?.user;
    console.log(user);
    
    return (
        <Box sx={{ marginTop: '100px' }}>
            <Background src="./backgrounds/login.svg"></Background>
            <Box sx={{ marginTop: '100px', backgroundColor: '#00003d' }}>
                <Box>
                    <Card
                        sx={{
                            height: '100%',
                            display: 'flex',
                            backgroundColor: '#2f105b',
                            flexDirection: 'column',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: 6
                            }
                        }}
                    >
                        <UserIcon src={user?._idImg?'/images/profile/'+user._idImg:undefined} sx={{width:128,height:128}}>

                        </UserIcon> 

                        <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                            <Button size="small" variant="contained" sx={{ backgroundColor: '#77589c', color: 'white' }}>
                                Editar Perfil
                            </Button>
                        </CardActions>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="div" sx={{ color: "white" }}>
                                {user?.username??''}
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                <Chip label="Cuenta" sx={{ color: "white" }} size="small" />
                                <Chip label={user?.role??''} variant="outlined" sx={{ color: "white" }} size="small" />
                            </Box>

                            <Typography variant="body2" color="white" sx={{ mb: 1 }}>
                                <strong>Nombre</strong> {user?.firstName??''}
                            </Typography>
                            <Typography variant="body2" color="white" sx={{ mb: 1 }}>
                                <strong>Apellido</strong> {user?.lastName??""}
                            </Typography>
                            <Typography variant="body2" color="white" sx={{ mb: 1 }}>
                                <strong>Correo Electrónico</strong> {user?.email??''}
                            </Typography>

                        </CardContent>
                    </Card>
                </Box>
                <Box>

                </Box>
            </Box>
            <Box>

            </Box>
        </Box>
    )
}