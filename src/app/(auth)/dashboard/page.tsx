
"use client"
import React, { useState } from "react";
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Paper,
    Grid,
    Card,
    CardContent,
    CardActionArea,
    Avatar,
    Chip,
} from "@mui/material";
import useDashboard from "./useDashboard";
import { Teams } from "./dashboard.types";
import Image from "next/image";
import Buttons from "../../components/UX/Buttons/Buttons";
import { useSession } from "next-auth/react";
import Background from "../../components/UX/Background/Background";



const DashboardView = () => {
    const [activeTab, setActiveTab] = useState(0);
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };
    const { teams, myTournaments, registeredTour } = useDashboard()
    return (
        <Box sx={{ paddingTop: 15, display: 'flex', justifyContent: "center" }}>
            <Background sx={{ backgroundColor: '#270E60' }}></Background>
            <Box sx={{ maxWidth: 900, width: "90%", }}>
                <Typography variant="h4" gutterBottom color="white">
                    Mi Pagina
                </Typography>

                <Paper sx={{ mb: 3, backgroundColor: '#2f105b', boxShadow: '0px 5px 5px ', }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        indicatorColor="primary"
                        textColor="primary"
                        sx={{
                            "& .MuiTabs-indicator": {
                                backgroundColor: "white"
                            },
                        }}
                    >
                        <Tab label="Mis Equipos" sx={{ color: "white", "&.Mui-selected": { color: "white" } }} />
                        <Tab label="Torneos Inscritos" sx={{ color: "white", "&.Mui-selected": { color: "white" } }} />
                        <Tab label="Mis Torneos" sx={{ color: "white", "&.Mui-selected": { color: "white" } }} />
                    </Tabs>
                </Paper>

                {/* Contenido de las secciones */}
                <Box sx={{ mt: 2 }}>
                    {activeTab === 0 && (
                        <SectionTeams teams={teams} />
                    )}

                    {activeTab === 1 && (
                        <SectionTournaments
                            tournaments={registeredTour}
                            type="registered"
                        />
                    )}

                    {activeTab === 2 && (
                        <SectionTournaments
                            tournaments={myTournaments}
                            type="myTournaments"
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
};

// Componente para la sección de Equipos
const SectionTeams = ({ teams }: { teams: Teams[] | null }) => (
    <Box>
        <Buttons sx={{ color: "white" }}>Crear Equipo</Buttons>
        <Grid container spacing={3}>
            {teams?.map((team, index) => (
                <Grid sx={{ width: 207 }}
                    key={index}
                >
                    <Card>
                        <CardActionArea>

                            <Box sx={{ width: '100%', height: 100 }}>
                                <Image
                                    src={process.env.NEXT_PUBLIC_HOST_SERVICE + "/images/tournaments/" + team._idImg}
                                    height={128}
                                    width={128}
                                    alt={"fondo"}
                                    className={"w-full h-full"}
                                    unoptimized={true}
                                ></Image>
                            </Box>
                            <Box sx={{ padding: 1 }}  >
                                <Box >
                                    <Typography variant="h6">{team.name}</Typography>
                                    <Typography >{team.description}</Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    {team.members.length} miembros
                                </Typography>

                            </Box>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
        {!teams && <Box sx={{ marginY: 3 }}> <Typography sx={{ textAlign: "center", color: "white" }}>No estas en ningun equipo</Typography></Box>}
    </Box>

);
const SectionTournaments = ({ tournaments, type }: { tournaments: any[] | null, type: string }) => {
    const { data: session, } = useSession();
    const user = session?.user;
    return (
        <Box>
            {["admin", "organizer"].includes(user?.role ?? "") && <Buttons sx={{ color: "white" }}>Crear Torneo</Buttons>}
            <Grid container spacing={3}>
                {tournaments?.map((tournament) => (
                    <Grid sx={{ width: 207, padding: 0 }} >
                        <Card sx={{ padding: 0 }}>
                            <Box sx={{ width: '100%', height: 100 }}>
                                <Image
                                    src={process.env.NEXT_PUBLIC_HOST_SERVICE + "/images/tournaments/" + tournament._idImg}
                                    height={128}
                                    width={128}
                                    alt={"fondo"}
                                    className={"w-full h-full"}
                                    unoptimized={true}
                                ></Image>
                            </Box>
                            <Box sx={{ padding: 1 }}  >
                                <Typography variant="h6" gutterBottom>
                                    {tournament.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Inicia: {new Date(tournament.startDate).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Termina: {new Date(tournament.endDate).toLocaleDateString()}
                                </Typography>

                                {type === "registered" && (
                                    <Chip
                                        label={tournament.status}
                                        color={tournament.status === "active" ? "success" : "default"}
                                    />
                                )}
                                {type === "myTournaments" && (
                                    <Typography variant="body2" >
                                        {tournament.teams.length} equipos participantes
                                    </Typography>
                                )}
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {!tournaments && <Box sx={{ marginY: 3 }}> <Typography sx={{ textAlign: "center", color: "white" }}>{
                type == "myTournaments" ? "No tienes ningun torneo" : "No estas en ningun torneo"}</Typography></Box>}

        </Box >
    );
}

export default DashboardView;

