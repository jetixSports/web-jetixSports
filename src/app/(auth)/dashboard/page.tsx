
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
    CardActionArea,
    Chip,
    CardActions,
    Button,
    CardContent,
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
import useInviteTeam from "./useInviteTeam";

//nuevo
import UserIcon from "../../components/UX/UserIcon/UserIcon";
import useUpdateUser from "../../hooks/useUpdateUser";
import { UpdateUser } from '../../types/updateUser';
import useProfileImg from "./useProfileImg";
import useStream from "../../Stream/useStream";

const DashboardView = () => {
    const [activeTab, setActiveTab] = useState(0);
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };
    const dashboardHook = useDashboard()
    const { data: session, update } = useSession();
    const user = session?.user;



    //Perfil 
    const updateUser = (data: UpdateUser) => { 
        update(data)
    }
    const rolUser = user?.role;
    let rol
    const imgHook = useProfileImg()
    const updateHook = useUpdateUser({ callback: updateUser })
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [showModalImg, setShowModalImg] = useState(false)

    if (rolUser === 'admin') {
        rol = 'Administrador';
    } else if (rolUser === 'organizer') {
        rol = 'Organizador';
    } else {
        rol = 'Regular';
    }

    //Final

    return (
        <Box sx={{ paddingTop: 15, display: 'flex', marginX: "auto", justifyContent: "center", maxWidth: 1200 }}>
            <Background sx={{ backgroundColor: ' #04082a' }}></Background>

            <Box sx={{ maxWidth: 800, width: "80%", marginRight: '20px' }}>
                <Typography variant="h4" gutterBottom color="white">
                    Mi Perfil
                </Typography>

                <Paper sx={{ mb: 3, backgroundColor: "#20105b", boxShadow: '0px 5px 5px ', }}>
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
                        <Tab label="Mis Streams" sx={{ color: "white", "&.Mui-selected": { color: "white" } }} />
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
                    {activeTab === 3 && (
                        <SectionStreams
                            user={user}

                        />
                    )}
                </Box>
            </Box>


            {/*COIMIENZO del perfil*/}
            <>
                {showModalImg && <Box onClick={() => {
                    setShowModalImg(false)
                }} sx={{ zIndex: 10, paddingTop: 5, position: "fixed", width: "100%", height: "100%", backdropFilter: "blur(5px)", display: "flex", "justifyContent": "center" }}>
                    <Box sx={{ marginTop: 9 }} onClick={(e) => e.stopPropagation()}>
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
                    <Box onClick={(e) => e.stopPropagation()}>
                        <Box sx={{ position: "relativo", width: "100%", display: 'flex', justifyContent: "end" }}>
                            <Box sx={{ position: "absolute", margin: 4 }}><CancelOutlined onClick={() => {
                                setShowModalEdit(false)
                            }} sx={{ color: "white", cursor: "pointer" }}></CancelOutlined> </Box>
                        </Box>
                        {updateHook.reactForm}
                    </Box>
                </Box>}

                <Background sx={{ backgroundColor: ' #04082a' }}></Background>

                <Box >

                    <Box sx={{ paddingY: 7, display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{ width: "290px", }}>
                            <Card
                                sx={{
                                    padding: 2,
                                    height: 'fit-content',
                                    display: 'flex',
                                    backgroundColor: '#20105b',
                                    flexDirection: 'column',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: 6
                                    }                                }}
                            >
                                <UserIcon src={user?._idImg ? '/images/profile/' + user._idImg : undefined} sx={{ width: 128, height: 128, mx: "auto"}}/>

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

                                    <Button onClick={() => setShowModalImg(true)} size="small" variant="contained" sx={{ backgroundColor: '#77589c', color: 'white' }}>
                                        Cambiar Foto
                                    </Button>
                                </CardActions>
                            </Card>
                        </Box>
                    </Box>
                </Box>
            </>
            {/*FINAL*/}
        </Box>
    );
};

// Componente para la sección de Equipos
const SectionTeams = ({ dashboardHook, user }: { dashboardHook: Dashboard, user: any }) => {
    const [showModalCreate, setShowModalCreate] = useState(false)
    const [showModalDetails, setShowModalDetails] = useState<Teams | null>(null)
    const [invitationTeam, setInvitationTeam] = useState<string | null>(null)
    const createTeamHook = useCreateTeam({
        callback() {
            createTeamHook.reset()
            setShowModalCreate(false)
            dashboardHook.getTeams()
        },
    })
    const inviteTeamHooks = useInviteTeam({ teamId: invitationTeam })
    return (
        <>
            {invitationTeam && <Box onClick={() => {
                setInvitationTeam(null)
            }} sx={{ zIndex: 10, paddingTop: 5, top: 0, left: 0, position: "fixed", width: "100%", height: "100%", backdropFilter: "blur(5px)", display: "flex", "justifyContent": "center" }}>
                <Box sx={{ marginY: 5 }} onClick={(e) => e.stopPropagation()}>
                    <Box sx={{ position: "relativo", width: "100%", display: 'flex', justifyContent: "end" }}>
                        <Box sx={{ position: "absolute", margin: 4, }}><CancelOutlined onClick={() => {
                            setInvitationTeam(null)
                        }} sx={{ color: "white", cursor: "pointer" }}></CancelOutlined> </Box>
                    </Box>
                    {inviteTeamHooks.reactForm}
                </Box>
            </Box>}
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
                        <Grid sx={{ width: 207, backgroundColor: "#440079", height: "100%", boxShadow: "0px 1px 4px ", borderRadius: '8px' }}
                            key={index}
                        >
                            <Card sx={{borderRadius:'8px', backgroundColor:'#440079'}}>
                                <CardActionArea sx={{ padding: '0 0 0 0', backgroundColor: "#440079" }}>
                                    <Box sx={{ width: '100%', height: 100 }}>
                                        <Image
                                            src={process.env.NEXT_PUBLIC_HOST_SERVICE + "/images/tournaments/" + team._idImg}
                                            height={256}
                                            width={256}
                                            alt={"fondo"}
                                            className={"w-full h-full"}
                                            objectFit="cover"
                                            unoptimized={true}
                                        ></Image>
                                    </Box>
                                    <Box sx={{ padding: 1.5 }}  >
                                        <Box >
                                            <Typography variant="h6" color="white">{team.name}</Typography>
                                            <Typography color="white" >{team.description}</Typography>
                                        </Box>
                                        <Typography variant="body2" color="white" sx={{ marginY: 1 }}>
                                            {team.members.length} miembros
                                        </Typography>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            {team._idLeader == user?._id && <Buttons onClick={() => setInvitationTeam(team._id)} sx={{ color: "white", marginBottom: 1, }}>Invitar</Buttons>}
                                            <Buttons onClick={() => setShowModalDetails(team)} sx={{ color: "white", marginLeft: "auto" }}>Detalles</Buttons>
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

// Componente para la sección de torneos
const SectionTournaments = ({ dashboardHook, type, user }: { dashboardHook: Dashboard, type: string, user: any }) => {
    const router = useRouter()
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
            <Box>
                {["admin", "organizer"].includes(user?.role ?? "") && <Buttons href="/createTournaments" sx={{ color: "white" }}>Crear Torneo</Buttons>}
                <Grid container spacing={3} sx={{ marginY: 2 }}>
                    {dashboardHook?.[type === "registered" ? 'registeredTour' : 'myTournaments']?.map((tournament, i) => (
                        <Grid sx={{ width: 207, padding: 0 }} key={i} onClick={() => router.push('/Torneos/' + tournament._id)} >
                            <Card sx={{ padding: 0 }}>
                                <CardActionArea>
                                    <Box sx={{ width: '100%', height: 100 }}>
                                        <Image
                                            src={process.env.NEXT_PUBLIC_HOST_SERVICE + "/images/tournaments/" + tournament._idImg}
                                            height={128}
                                            width={128}
                                            alt={"fondo"}
                                            className={"w-full h-full"}
                                            objectFit="cover"
                                            unoptimized={true}
                                        ></Image>
                                    </Box>
                                    <Box sx={{ padding: 1, backgroundColor: "#440079" }}  >
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
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                {!dashboardHook?.[type === "registered" ? 'registeredTour' : 'myTournaments'] && <Box sx={{ marginY: 3 }}> <Typography sx={{ textAlign: "center", color: "white" }}>{
                    type == "myTournaments" ? "No tienes ningun torneo" : "No estas en ningun torneo"}</Typography></Box>}

            </Box >
        </>

    );
}
const SectionStreams = ({ user, }: { user: any }) => {
    const router = useRouter()
    const { stream } = useStream({ _idUser: user?._id, status: "ALL" })
    return <>
        <Box>
            <Buttons onClick={() => router.push('Stream/create')} sx={{ color: "white" }}>Subir Stream</Buttons>

            <Grid container spacing={3} sx={{ marginY: 2 }}>
                {stream.map((item: any, i) => (
                    <Grid sx={{ width: 207, padding: 0 }} key={i} onClick={() => window.open(item.URL, '_blank')}>
                        <Card sx={{ padding: 0, borderRadius:'8px', backgroundColor:'#440079' }}>
                            <CardActionArea>
                                <Box sx={{ width: '100%', height: 100 }}>
                                    <Image
                                        src={item.imgSrc}
                                        height={128}
                                        width={128}
                                        alt={"fondo"}
                                        className={"w-full h-full"}
                                        objectFit="cover"
                                        unoptimized={true}
                                    ></Image>
                                </Box>
                                <Box sx={{ padding: 1, backgroundColor: "#440079" }}  >
                                    <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
                                        {item.title}
                                    </Typography>
                                    <Box>

                                        <Chip label={item.status == 'active' ? 'Activo' : 'Inactivo'} variant="outlined" sx={{ color: "white" }} size="small" />
                                    </Box>
                                    <Box sx={{ width: '100%', display: 'flex' }}>

                                        <Buttons onClick={(e) => { e.stopPropagation(); router.push('Stream/' + item._id) }} sx={{ color: "white", marginTop: '10px', marginLeft: 'auto' }}>Editar</Buttons>
                                    </Box>
                                </Box>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
                {stream.length == 0 &&
                    <Box sx={{ marginY: 3, width: "100%" }}> <Typography sx={{ textAlign: "center", color: "white" }}>No se encontro ningun Stream</Typography></Box>
                }
            </Grid>
 
        </Box >
    </>
}

export default DashboardView;

