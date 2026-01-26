'use client';
import React, { useState } from "react";
import { Box, IconButton, Autocomplete, TextField, Card, CardMedia, CardContent, CardActions, Button, Typography, Chip, Container, Tooltip } from "@mui/material";
import { CancelOutlined, Search } from "@mui/icons-material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import Background from "../components/UX/Background/Background";
import BoxHeader from "../components/UX/Box/Box";
import CardTorneosDestacados from "../components/UX/Card/CardTorneosDestacados";
import CardTorneos from "../components/UX/Card/CradTorneos";
import useCreateTorneo from "../(auth)/dashboard/useCreateTorneo";
import usePage from "../usePage";

interface Tournament {
    _id: string;
    name: string;
    typeSport: string;
    status: string;
    quotas: number;
    teamSpace: number;
    amount: string;
    startDate: string;
    _idImg: string;
    teams: any[];
    label: string;
}

export default function Torneos() {
    const { TorneoDes, loading, error } = usePage();
    const [showModalCreate, setShowModalCreate] = useState(false)
    const [Search, SetSearch] = useState(false)
    const createTorneoHook = useCreateTorneo({
        callback() {
            createTorneoHook.reset()
            setShowModalCreate(false)
        },
    })

    const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
    const options: Tournament[] = TorneoDes?.map(torneo => ({
        ...torneo,
        label: torneo.name || 'Nombre no disponible'
    })) || [];

    return (
        <Box sx={{ margin: '0' }}>
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
                            <Box sx={{ position: "absolute", marginY: 4, marginX: 4 }}>
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
                <Background sx={{ backgroundColor: "#04082a" }} src="./backgrounds/torneo.svg"></Background>
                <Box sx={{ color: 'white', margin: '220px 0  5% 100px' }}>

                    <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                        Torneos</Typography>
                    <Typography>¿Quieres convertirte en un competidor o quieres ser el que trae a la competencia? </Typography>
                    <Typography>Si es así, ¡estas en lugar correcto! </Typography>
                    <Typography>Jetix Sports ofrece acceso a torneos exclusivos en tus videojuegos favoritos. </Typography>
                </Box>
            </BoxHeader>

            <Box sx={{background: '#04082a' }}>
                <Box sx={{padding: '20px 0 30px 0'}}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white', marginTop: '100px', marginLeft: '100px' }}>
                        Torneos Destacados
                    </Typography>
                </Box>
                <CardTorneosDestacados />
            </Box>

            <Box sx={{ background: '#04082a'}}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white', marginTop: '120px', marginLeft: '100px', padding: '70px 0 10px 0'}}>
                    Torneos Proximos
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row-reverse', paddingTop: '20px',  width: " 93%" }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '600px', justifyContent: 'flex-end' }}>
                        <Box sx={{ width: '70%' }}>
                            <Autocomplete
                                clearOnEscape
                                options={options}
                                sx={{
                                    p: 0, marginY: "5px", backgroundColor: "#20105B", borderRadius: "10px", height: 55,
                                    color: "white", // Color del texto en el input (no suficiente por sí solo)
                                    "& .MuiInputBase-root": {
                                        color: "white", // Color del texto ingresado
                                    },
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "none",
                                    },
                                    "& .MuiInputLabel-root": {
                                        color: "white", // Color del label ("Buscar torneos...")
                                    },
                                    "& .MuiAutocomplete-popupIndicator": {
                                        color: "white", // Color del ícono de desplegar
                                    },
                                    "& .MuiAutocomplete-clearIndicator": {
                                        color: "white", // Color del ícono de limpiar
                                    }
                                }}
                                renderInput={(params) => <TextField  {...params} label="Buscar torneos por nombre..." />}
                                onChange={(event, newValue) => {
                                    setSelectedTournament(newValue);
                                    SetSearch(true)
                                }}
                                isOptionEqualToValue={(option, value) => option._id === value._id}
                            />
                        </Box>
                        <Box sx={{ width: '100px' }}>
                            <Tooltip title="Recargar Torneos">
                                <IconButton
                                    color="secondary"
                                    onClick={(e) => { SetSearch(false) }}
                                    aria-label="Recargar"
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                        }
                                    }}>
                                    <RestartAltIcon />
                                    <Typography>Recargar</Typography>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    {selectedTournament && Search == true && (
                        <Box sx={{ py: 3, width: '100%' }}>
                            <Container maxWidth="lg">
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4, marginTop: '94px' }}>
                                    <Box sx={{ width: '100%' }}>
                                        <Box>
                                            <Card sx={{
                                                height: '120px', width: '100%', display: 'flex', backgroundColor: '#2f105b', flexDirection: 'row',
                                                transition: 'transform 0.3s, box-shadow 0.3s',
                                                '&:hover': {
                                                    transform: 'translateY(-5px)',
                                                    boxShadow: 6
                                                }
                                            }}>
                                                <CardMedia
                                                    src={process.env.NEXT_PUBLIC_HOST_SERVICE + "/images/tournaments/" + selectedTournament._idImg}
                                                    component="img"
                                                    sx={{ width: 200 }}
                                                    alt={selectedTournament.name}
                                                />
                                                <Box sx={{ flexGrow: '1', display: 'flex', flexDirection: 'row' }}>

                                                    <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>

                                                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '400px', justifyContent: 'center' }}>
                                                            <Typography gutterBottom variant="h5" component="div" sx={{ color: "white" }}>
                                                                {selectedTournament.name}
                                                            </Typography>

                                                            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                                                <Chip label={selectedTournament.typeSport} sx={{ color: "white" }} size="small" />
                                                            </Box>
                                                        </Box>

                                                        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '300px' }}>

                                                            <Typography variant="body2" color="white" sx={{ mb: 1, marginBottom: '10px' }}>
                                                                Precio de Inscripción: <strong>{selectedTournament.amount}</strong>
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ mb: 1, color: "white" }}>
                                                                Fecha: {new Date(selectedTournament.startDate).toLocaleString()}
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ mb: 1, color: "white" }}>
                                                                Jugadores: /{selectedTournament.quotas} • {selectedTournament.teamSpace} vs {selectedTournament.teamSpace}
                                                            </Typography>


                                                        </Box>
                                                    </CardContent>
                                                    <CardActions sx={{ display: 'flex', flexDirection: 'row', marginLeft: '15px' }}>
                                                        <Button href={`/Torneos/${selectedTournament._id}`} size="small" sx={{ color: 'white', borderRadius: '2px', borderColor: 'white' }}>
                                                            Ver detalles
                                                        </Button>
                                                        <Button href={`/Torneos/${selectedTournament._id}/inscription`} size="small" variant="contained" sx={{ backgroundColor: '#77589c', color: 'white' }}>
                                                            Unirse
                                                        </Button>
                                                    </CardActions>
                                                </Box>
                                            </Card>
                                        </Box>
                                    </Box>
                                </Box>
                            </Container>
                        </Box>
                    )}

                    {Search == false && (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CardTorneos />
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>

    )
}
