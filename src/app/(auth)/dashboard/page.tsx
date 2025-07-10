
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
import { Dashboard, Teams } from "./dashboard.types";
import Image from "next/image";
import Buttons from "../../components/UX/Buttons/Buttons";
import { useSession } from "next-auth/react";
import Background from "../../components/UX/Background/Background";
import useCreateTeam from "./useCreateTeam";
import { CancelOutlined } from "@mui/icons-material";
import useCreateTorneo from "./useCreateTorneo";
import { useRouter } from "next/navigation";
import TeamDetails from "../../components/UX/TeamDetails/TeamDetails";


const DashboardView = () => {
    const [activeTab, setActiveTab] = useState(0);
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };
    const dashboardHook = useDashboard()
    const { data: session, } = useSession();
    const user = session?.user;
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
                        <SectionTeams dashboardHook={dashboardHook} user={user} />
                    )}

                    {activeTab === 1 && (
                        <SectionTournaments
                            user={user}
                            dashboardHook={dashboardHook}
                            type="registered"
                        />
                    )}

                    {activeTab === 2 && (
                        <SectionTournaments
                            user={user}
                            dashboardHook={dashboardHook}
                            type="myTournaments"
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
};

// Componente para la sección de Equipos
const SectionTeams = ({ dashboardHook, user }: { dashboardHook: Dashboard, user: any }) => {
    const [showModalCreate, setShowModalCreate] = useState(false)
    const [showModalDetails, setShowModalDetails] = useState<Teams|null>(null)
    const createTeamHook = useCreateTeam({
        callback() {
            createTeamHook.reset()
            setShowModalCreate(false)
            dashboardHook.getTeams()
        },
    })
    return (
        <>
            {showModalCreate && <Box onClick={() => {
                setShowModalCreate(false),
                    createTeamHook.reset()
            }} sx={{ zIndex: 10, paddingTop: 5, top: 0, left: 0, position: "fixed", width: "100%", height: "100%", backdropFilter: "blur(5px)", display: "flex", "justifyContent": "center" }}>
                <Box sx={{ marginTop: 10 }} onClick={(e) => e.stopPropagation()}>
                    <Box sx={{ position: "relativo", width: "100%", display: 'flex', justifyContent: "end" }}>
                        <Box sx={{ position: "absolute", margin: 4 }}><CancelOutlined onClick={() => {
                            setShowModalCreate(false)
                            createTeamHook.reset()

                        }} sx={{ color: "white", cursor: "pointer" }}></CancelOutlined> </Box>
                    </Box>
                    {createTeamHook.reactForm}
                </Box>
            </Box>}
            {showModalDetails && <Box onClick={() => {
                setShowModalDetails(null)
            }} sx={{ zIndex: 10, paddingTop: 5, top: 0, left: 0, position: "fixed", width: "100%", height: "100%", backdropFilter: "blur(5px)", display: "flex", "justifyContent": "center" }}>
                <Box sx={{ marginTop: 10 }} onClick={(e) => e.stopPropagation()}>
                    <Box sx={{ position: "relativo", width: "100%", display: 'flex', justifyContent: "end" }}>
                        <Box sx={{ position: "absolute", margin: 4 }}><CancelOutlined onClick={() => {
                            setShowModalDetails(null)
                        }} sx={{ color: "white", cursor: "pointer" }}></CancelOutlined> </Box>
                    </Box>
                    <TeamDetails team={showModalDetails}></TeamDetails>
                </Box>
            </Box>}
            <Box>
                <Buttons onClick={() => setShowModalCreate(true)} sx={{ color: "white" }}>Crear Equipo</Buttons>
                <Grid container spacing={3} sx={{ marginY: 2 }}>
                    {dashboardHook.teams?.map((team, index) => (
                        <Grid sx={{ width: 207, height: "100%", boxShadow: "0px 1px 4px " }}
                            key={index}
                        >
                            <Card>
                                <CardActionArea>
                                    <Box sx={{ width: '100%', height: 100 }}>
                                        <Image
                                            src={process.env.NEXT_PUBLIC_HOST_SERVICE + "/images/tournaments/" + team._idImg}
                                            height={256}
                                            width={256}
                                            alt={"fondo"}
                                            className={"w-full h-full"}
                                            unoptimized={true}
                                        ></Image>
                                    </Box>
                                    <Box sx={{ padding: 1, backgroundColor: "#440079" }}  >
                                        <Box >
                                            <Typography variant="h6" color="white">{team.name}</Typography>
                                            <Typography color="white" >{team.description}</Typography>
                                        </Box>
                                        <Typography variant="body2" color="white" sx={{ marginY: 1 }}>
                                            {team.members.length} miembros
                                        </Typography>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            {team._idLeader == user?._id && <Buttons sx={{ color: "white", marginBottom: 1,}}>Invitar</Buttons>}
                                            <Buttons onClick={() => setShowModalDetails(team)} sx={{ color: "white", marginLeft:"auto"  }}>Detalles</Buttons>
                                        </Box>
                                    </Box>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                {!dashboardHook.teams && <Box sx={{ marginY: 3 }}> <Typography sx={{ textAlign: "center", color: "white" }}>No estas en ningun equipo</Typography></Box>}
            </Box>
        </>

    )
}

const SectionTournaments = ({ dashboardHook, type, user }: {  dashboardHook: Dashboard, type: string, user: any }) => {
    const router=useRouter()
    const [showModalCreate, setShowModalCreate] = useState(false)
    const createTorneoHook = useCreateTorneo({
        callback() {
            createTorneoHook.reset()
            setShowModalCreate(false)
            dashboardHook.getMyTournaments()
        },
    })

    return (
        <>
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
            <Box>
                {["admin", "organizer"].includes(user?.role ?? "") && <Buttons onClick={() => setShowModalCreate(true)} sx={{ color: "white" }}>Crear Torneo</Buttons>}
                <Grid container spacing={3} sx={{ marginY: 2 }}>
                    {dashboardHook?.[type === "registered"?'registeredTour':'myTournaments']?.map((tournament,i) => (
                        <Grid sx={{ width: 207, padding: 0 }} key={i} onClick={()=>router.push('/Torneos/'+tournament._id)} >
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
                                <Box sx={{ padding: 1,backgroundColor: "#440079"  }}  >
                                    <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
                                        {tournament.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom sx={{ color: "white" }}>
                                        Inicia: {new Date(tournament.startDate).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom sx={{ color: "white" }}>
                                        Termina: {new Date(tournament.endDate).toLocaleDateString()}
                                    </Typography>

                                    {type === "registered" && (
                                        <Chip
                                            label={tournament.status}
                                            color={tournament.status === "active" ? "success" : "default"}
                                        />
                                    )}
                                    {type === "myTournaments" && (
                                        <Typography variant="body2" sx={{ color: "white" }}>
                                            {tournament.teams.length} equipos participantes
                                        </Typography>
                                    )}
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                {!dashboardHook?.[type === "registered"?'registeredTour':'myTournaments'] && <Box sx={{ marginY: 3 }}> <Typography sx={{ textAlign: "center", color: "white" }}>{
                    type == "myTournaments" ? "No tienes ningun torneo" : "No estas en ningun torneo"}</Typography></Box>}

            </Box >
        </>

    );
}

export default DashboardView;

