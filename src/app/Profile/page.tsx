'use client'
import React, { useState } from 'react'
import { Box, Card, CardMedia, CardActions, CardContent, Typography, Button, Chip } from '@mui/material'
import Background from '../components/UX/Background/Background';
import { useSession } from 'next-auth/react';
import UserIcon from '../components/UX/UserIcon/UserIcon';
import useUpdateUser from '../hooks/useUpdateUser';
import { CancelOutlined } from '@mui/icons-material';
import { UpdateUser } from '../types/updateUser';
import useProfileImg from './useProfileImg';

export default function Profile() {
    const { data: session, update } = useSession();
    const updateUser = (data: UpdateUser) => {
        update(data)
    }
    
    const user = session?.user;
    const rolUser = user?.role;
    let rol
    const imgHook = useProfileImg()
    const updateHook = useUpdateUser({ callback: updateUser })
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [showModalImg, setShowModalImg] = useState(false)

    if (rolUser === 'admin') {
      rol = 'Administrador';
    } else if (rolUser=== 'organizer') {
      rol = 'Organizador';
    } else {
      rol = 'Usuario';
    }
    
    return (
        <>
            {showModalImg && <Box onClick={() => {
                setShowModalImg(false)
            }} sx={{ zIndex: 10, paddingTop: 5, position: "fixed", width: "100%", height: "100%", backdropFilter: "blur(5px)", display: "flex", "justifyContent": "center" }}>
                <Box sx={{ marginTop: 10 }} onClick={(e) => e.stopPropagation()}>
                    <Box sx={{ position: "relativo", width: "100%", display: 'flex', justifyContent: "end" }}>
                        <Box sx={{ position: "absolute", margin: 4 }}><CancelOutlined onClick={() => {
                            setShowModalImg(false)
                        }} sx={{ color: "white", cursor: "pointer" }}></CancelOutlined> </Box>
                    </Box>
                    {imgHook.reactForm}
                </Box>
            </Box>}
            {showModalEdit && <Box onClick={() => {
                setShowModalEdit(false)
            }} sx={{ zIndex: 10, paddingTop: 5, position: "fixed", width: "100%", height: "100%", backdropFilter: "blur(5px)", display: "flex", "justifyContent": "center" }}>
                <Box sx={{ marginTop: 10 }} onClick={(e) => e.stopPropagation()}>
                    <Box sx={{ position: "relativo", width: "100%", display: 'flex', justifyContent: "end" }}>
                        <Box sx={{ position: "absolute", margin: 4 }}><CancelOutlined onClick={() => {
                            setShowModalEdit(false)
                        }} sx={{ color: "white", cursor: "pointer" }}></CancelOutlined> </Box>
                    </Box>
                    {updateHook.reactForm}
                </Box>
            </Box>}
            <Background sx={{backgroundColor:' #04082a'}}></Background>
            <Box >

                <Box sx={{ paddingY: 15, display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: "290px", }}>
                        <Card
                            sx={{
                                padding: 2,
                                height: 'fit-content',
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
                            <UserIcon src={user?._idImg ? '/images/profile/' + user._idImg : undefined} sx={{ width: 128, height: 128, mx: "auto" }}>
                            </UserIcon>

                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="div" sx={{ color: "white", textAlign: "center" }}>
                                    {user?.username ?? ''}
                                </Typography>

                                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                    <Chip label="Cuenta" sx={{ color: "white" }} size="small" />
                                    <Chip label={rol} variant="outlined" sx={{ color: "white" }} size="small" />
                                </Box>

                                <Typography variant="body2" color="white" sx={{ mb: 1 }}>
                                    <strong>Nombre</strong> {user?.firstName ?? ''}
                                </Typography>
                                <Typography variant="body2" color="white" sx={{ mb: 1 }}>
                                    <strong>Apellido</strong> {user?.lastName ?? ""}
                                </Typography>
                                <Typography variant="body2" color="white" sx={{ mb: 1 }}>
                                    <strong>Correo Electrónico</strong> {user?.email ?? ''}
                                </Typography>

                            </CardContent>
                            <CardActions sx={{}}>
                                <Button onClick={() => {
                                    setShowModalEdit(true)
                                    updateHook.setUser(user as any ?? null); updateHook.setIdUser(user?._id ?? '')
                                }} size="small" variant="contained" sx={{ backgroundColor: '#77589c', color: 'white' }}>
                                    Editar Perfil
                                </Button>
                            </CardActions>
                            <CardActions sx={{}}>
                                <Button onClick={() => setShowModalImg(true)} size="small" variant="contained" sx={{ backgroundColor: '#77589c', color: 'white' }}>
                                    Cambiar Foto
                                </Button>
                            </CardActions>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </>

    )
}
