import React from 'react'
import { Box, Card, CardMedia, CardActions, CardContent, Typography, Button, Chip } from '@mui/material'
import Background from '../components/UX/Background/Background';

interface DataUser {
  id: number;
  name: string;
  lastname: string;
  username: string;
  correo: string;
  rol: string;
  imageprofile: any;
}

export default function Profile() {
    const Users: DataUser[] = [
        {
            id: 1,
            name: 'Justin',
            lastname: 'Vegas',
            username: 'MentaColada',
            correo: 'justinVegas@gmail.com',
            rol: 'Admin',
            imageprofile: '/assets/img/valorant.png'
        }
    ]
    
    // Accedemos al primer usuario del array
    const User = Users[0];

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
                        <CardMedia
                            component="img"
                            sx={{width:"200px", height:"140px"}}
                            image={User.imageprofile}
                            alt="Profile image"  
                        />

                        <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                            <Button size="small" variant="contained" sx={{ backgroundColor: '#77589c', color: 'white' }}>
                                Editar Perfil
                            </Button>
                        </CardActions>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="div" sx={{ color: "white" }}>
                                {User.username}
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                <Chip label="Cuenta" sx={{ color: "white" }} size="small" />
                                <Chip label={User.rol} variant="outlined" sx={{ color: "white" }} size="small" />
                            </Box>

                            <Typography variant="body2" color="white" sx={{ mb: 1 }}>
                                <strong>Nombre</strong> {User.name}
                            </Typography>
                            <Typography variant="body2" color="white" sx={{ mb: 1 }}>
                                <strong>Apellido</strong> {User.lastname}
                            </Typography>
                            <Typography variant="body2" color="white" sx={{ mb: 1 }}>
                                <strong>Correo Electrónico</strong> {User.correo}
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