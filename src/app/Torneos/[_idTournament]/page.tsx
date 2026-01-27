"use client"
import { use, useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Collapse,
  Grid,
  Chip,
  Paper,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { ExpandMore, ExpandLess, SportsEsports, People, LiveTv, CancelOutlined, ExpandCircleDown } from '@mui/icons-material';
import Background from '../../components/UX/Background/Background';
import useIdTournament from './useIdTournament';
import { Teams, Tournaments } from '../../(auth)/dashboard/dashboard.types';
import { Match } from '../../types/matchs.types';
import Buttons from '../../components/UX/Buttons/Buttons';
import useCreateStream from './useCreateStream';
import { useSession } from 'next-auth/react';
import useCreateRound from './useCreateRound';
import useFinishedMatch from './useFinishedMatch';
import useFetch from '../../hooks/useFetch';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface HookTour {
  users: { _id: string, firstName: string, lastName: string }[] | null,
  tournament: Tournaments | null,
  teams: Teams[] | null,
  matchs: Match[] | null,
  getData: () => any
}
export default function TournamentView({ params: { _idTournament } }: { params: { _idTournament: string } }) {
  const hookIdTour = useIdTournament({ _idTournament })
  const [activeTab, setActiveTab] = useState(0);
  const [expandedRounds, setExpandedRounds] = useState<number[]>([]);
  const [streamData, setStreamData] = useState<{ _idUser: string, _idTournament: string, _idMatch?: string, _idTeam?: string, type: string } | null>(null)
  const createStreamHook = useCreateStream({
    dataStream: streamData, callback() {
      setStreamData(null);
      hookIdTour.getData()
    },
  })
  const { data: session } = useSession();
  const user = session?.user;
  const { tournament, matchs, teams } = hookIdTour
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const toggleRound = (roundId: number) => {
    setExpandedRounds(prev =>
      prev.includes(roundId)
        ? prev.filter(id => id !== roundId)
        : [...prev, roundId]
    );
  };

  const tournamentTeams = hookIdTour?.tournament?.teams;
const IsUserRegis = tournamentTeams?.some(team =>  team?._idLeader?.toString() === user?._id?.toString()) || false;


  return (
    <Box sx={{ paddingTop: 15, display: 'flex', justifyContent: "center" }}>
      <Background sx={{ backgroundColor: ' #04082a' }}></Background>
      {streamData && <Box onClick={() => {
        setStreamData(null)
      }} sx={{ zIndex: 10, paddingTop: 5, top: 0, left: 0, position: "fixed", width: "100%", height: "100%", backdropFilter: "blur(5px)", display: "flex", "justifyContent": "center" }}>
        <Box sx={{ marginTop: 10 }} onClick={(e) => e.stopPropagation()}>
          <Box sx={{ position: "relativo", width: "100%", display: 'flex', justifyContent: "end" }}>
            <Box sx={{ position: "absolute", margin: 4 }}><CancelOutlined onClick={() => {
              setStreamData(null)
            }} sx={{ color: "white", cursor: "pointer" }}></CancelOutlined> </Box>
          </Box>
          {createStreamHook.reactForm}
        </Box>
      </Box>}
      <Box sx={{ maxWidth: 900, width: "90%", marginBottom: 3 }}>
        <Box sx={{width:'100%'}}>
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
                  <Typography>Ir a Mi Perfil</Typography>
                </IconButton>
           </Tooltip>
        </Box>
        <Box>
          <Typography variant="h4" gutterBottom color="white">
            {hookIdTour.tournament?.name}
          </Typography>

        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop:'10px' }}>
          <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', marginBottom: 2 }}>
           {!IsUserRegis && <Buttons href={`${_idTournament}/inscription`} sx={{ color: "white" }}>Inscribirse </Buttons>}
          </Box> 
          <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', marginBottom: 2, justifyContent: 'flex-end' }}>
            {tournament?._idReferee == user?._id && <Buttons href={`${_idTournament}/payments`} sx={{ color: "white", p: 1 }}>Gestion de pagos</Buttons>}
          </Box>
        </Box>

        <Accordion sx={{backgroundColor:'#2f105b', color:'white', borderRadius:'4px', marginBottom:'10px'}}>
          <AccordionSummary expandIcon={<ExpandCircleDown sx={{color:'white'}}/>}>
            <Typography component="span">Detalles</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{backgroundColor:'#04082a', marginTop:'10px', p:'20px 30px 20px'}}>
            <Typography variant="body1" gutterBottom color="white" sx={{whiteSpace: 'pre-line'}}>
            {hookIdTour.tournament?.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Paper sx={{ mb: 3, backgroundColor: '#2f105b', boxShadow: '0px 5px 5px ', }}>
          <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "white"
              },
            }}>
            <Tab icon={<SportsEsports />} label="Rondas" sx={{ color: "white", "&.Mui-selected": { color: "white" } }} />
            <Tab icon={<People />} label="Equipos" sx={{ color: "white", "&.Mui-selected": { color: "white" } }} />
          </Tabs>
        </Paper>

        <Box sx={{ mt: 3 }}>
          {activeTab === 0 && (
            <RoundsSection
              expandedRounds={expandedRounds}
              toggleRound={toggleRound}
              hookTour={hookIdTour}
              setStreamData={setStreamData as any}
            />
          )}

          {activeTab === 1 && <TeamsSection hookTour={hookIdTour} />}
        </Box>
      </Box>
    </Box>
  );
}

function RoundsSection({ expandedRounds, toggleRound, hookTour, setStreamData }: {
  expandedRounds: number[],
  toggleRound: (id: number) => void,
  setStreamData: (data: { _idUser: string, _idTournament: string, _idMatch?: string, _idTeam?: string, type: string } | null) => {}
  hookTour: HookTour
}) {
  const { data: session } = useSession();
  const user = session?.user;
  const { tournament, matchs, teams } = hookTour
  const router = useRouter()
  const [showCreate, setShowCreate] = useState(false)
  const creatRoundHook = useCreateRound({ teams, tournament, callback: () => { hookTour.getData(); setShowCreate(false) } })
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const finishedMatchHook = useFinishedMatch({ match: selectedMatch, teams, _idUser: user?._id ?? "", callback: () => { hookTour.getData(); setSelectedMatch(null) } })
  const { post, get } = useFetch();
  const [statusRound, setStatusRound] = useState(true)


  return (
    <Box>
      {showCreate && <Box onClick={() => {
        setShowCreate(false)
      }} sx={{ zIndex: 10, paddingTop: 5, top: 0, left: 0, position: "fixed", width: "100%", height: "100%", backdropFilter: "blur(5px)", display: "flex", "justifyContent": "center" }}>
        <Box sx={{ marginTop: 10 }} onClick={(e) => e.stopPropagation()}>
          <Box sx={{ position: "relativo", width: "100%", display: 'flex', justifyContent: "end" }}>
            <Box sx={{ position: "absolute", margin: 4 }}><CancelOutlined onClick={() => {
              setShowCreate(false)
            }} sx={{ color: "white", cursor: "pointer" }}></CancelOutlined> </Box>
          </Box>
          {creatRoundHook.reactForm}
        </Box>
      </Box>}
      {selectedMatch && <Box onClick={() => {
        setSelectedMatch(null)
      }} sx={{ zIndex: 10, paddingTop: 5, top: 0, left: 0, position: "fixed", width: "100%", height: "100%", backdropFilter: "blur(5px)", display: "flex", "justifyContent": "center" }}>
        <Box sx={{ marginTop: 10 }} onClick={(e) => e.stopPropagation()}>
          <Box sx={{ position: "relativo", width: "100%", display: 'flex', justifyContent: "end" }}>
            <Box sx={{ position: "absolute", margin: 4 }}><CancelOutlined onClick={() => {
              setSelectedMatch(null)
            }} sx={{ color: "white", cursor: "pointer" }}></CancelOutlined> </Box>
          </Box>
          {finishedMatchHook.reactForm}
        </Box>
      </Box>}

      <Typography variant="h5" gutterBottom color="white">
        Progreso del Torneo
      </Typography>
      {tournament?._idReferee == user?._id && <Buttons onClick={() => setShowCreate(true)} sx={{ color: "white", marginBottom: 2 }}>Crear Ronda</Buttons>}

      {tournament?.rounds?.length == 0 && <Box sx={{ marginY: 3 }}> <Typography sx={{ textAlign: "center", color: "white" }}>Este torneo no posee ninguna ronda</Typography></Box>}
      {tournament?.rounds.map((round, i) => (
        <Card key={i} sx={{ mb: 2 }}>
          <CardHeader
            sx={{ cursor: 'pointer' }}
            title={"Ronda " + round.nRound + '   -  ' + (round.status == 'active' ? "Activa" : "Finalizada")}
            onClick={() => toggleRound(i)}
            action={
              <IconButton >
                {expandedRounds.includes(i) ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            }
          />
          <Collapse in={expandedRounds.includes(i)} timeout="auto" unmountOnExit>
            <CardContent>
              <Grid container spacing={2}>
                {round._idMatchs.map((_idMatch, j) => {
                  const match = matchs?.find((m) => m._id == _idMatch)
                  if (!match) return ''
                  const teamWinner = match._idTeamWinner && match._idTeamWinner != '' ? teams?.find(t => t._id == match._idTeamWinner)?.name ?? '--' : '--'
                  const userMatch = match.teams.find(m => teams?.find(t => t._id == m._idTeam)?._idLeader == user?._id)
                  return (
                    <Grid key={j} sx={{ minWidth: '280px' }}>
                      <Paper elevation={2} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom >
                          Encuentro {j + 1}
                        </Typography>
                        <Typography>Equipos: </Typography>
                        <Box sx={{ paddingLeft: 2, marginY: 1 }}>

                          {match.teams.map((matchTeam, k) => {
                            const team = teams?.find((t) => t._id == matchTeam._idTeam)
                            return <Box key={k} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography>{team?.name + ' '} </Typography>
                              <Typography>{matchTeam.score || '--'}</Typography>
                            </Box>
                          })}
                        </Box>
                        <Typography>Estatus: {(match.status == 'active' ? "Activo" : "Finalizado")}</Typography>
                        <Typography>Duración: {match?.duration ?? "--"}</Typography>
                        <Typography>Fecha: {(new Date(match.initMatch).toLocaleString())}</Typography>
                        <Box sx={{ mt: 1, textAlign: 'center' }}>
                          <Chip
                            label={`Equipo Ganador: ${teamWinner} `}
                            color="success"
                            size="small"
                          />
                        </Box>
                        {match.status != "finished" && <Box sx={{ display: "flex", marginTop: 2 }}>
                          {userMatch && <Buttons onClick={() => {
                            if (userMatch?._idStream && userMatch?._idStream != "") {
                              return window.open(userMatch?._idStream, '_blank') 
                            }
                            setStreamData({ _idTournament: tournament?._id, _idUser: user?._id ?? "", type: "match", _idMatch: match._id, _idTeam: userMatch._idTeam })
                          }} sx={{ color: "white", }}>
                            {userMatch?._idStream && userMatch?._idStream != "" ? "Ver mi stream" : "Subir stream"}
                          </Buttons>}
                          <Buttons onClick={() => setSelectedMatch(match)} sx={{ color: "white", marginLeft: "auto" }}>Finalizar</Buttons>
                        </Box>}
                      </Paper>
                    </Grid>
                  )
                })}
              </Grid>
              {(round.status != 'finished' && tournament._idReferee == user?._id) && <Box sx={{ display: "flex" }}>

                <Buttons sx={{ color: 'white', marginTop: 2, marginLeft: 'auto' }}
                  onClick={async () => {
                    if (!statusRound)
                      return
                    try {
                      setStatusRound(false)
                      const loadindToast = toast.loading("Finalizando ronda...")
                      const res = await post(
                        process.env.NEXT_PUBLIC_HOST_SERVICE + "/tournaments/finishedRound",
                        {
                          _idTournament: tournament?._id,
                          _idUser: user?._id
                        }
                      );
                      toast.dismiss(loadindToast)
                      setStatusRound(true)
                      if (res.statusCode != 200)
                        return toast.error(res.message)
                      hookTour.getData()
                      toast.success(res.message)
                    } catch (error) {
                      toast.error(error + "")
                      setStatusRound(true)
                    }
                  }}
                >Finalizar Ronda</Buttons>
              </Box>}
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </Box>
  );
}

function TeamsSection({ hookTour }: { hookTour: HookTour }) {
  const { tournament, users, teams } = hookTour
  return (
    <Box>
      <Typography variant="h5" gutterBottom color="white">
        Equipos Participantes
      </Typography>
      {tournament?.teams?.length == 0 && <Box sx={{ marginY: 3 }}> <Typography sx={{ textAlign: "center", color: "white" }}>No se ha inscrito ningun equipo</Typography></Box>}
      <Grid container spacing={3}>
        {tournament?.teams.map((teamTour, i) => {
          const team = teams?.find((t) => t._id == teamTour._idTeam)
          if (!team) return ''
          const onlyRound = tournament.rounds.reduce((acc, round) => {
            if (round.teamsMatchs.includes(teamTour._idTeam) ||
              round.teamsWinners.includes(teamTour._idTeam))
              acc = round
            return acc
          }, {} as any)
          return (
            <Grid key={i}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {team.name.charAt(0)}
                    </Avatar>
                  }
                  title={team.name}
                  subheader={`Ronda actual: ${onlyRound?.nRound ?? '-'}`}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Miembros:
                  </Typography>
                  <Box sx={{ paddingLeft: 2 }}>
                    {team.members.map((_idUser, index) => {
                      const user = users?.find(u => u._id == _idUser)
                      return (
                        <Typography key={index}>{`${index + 1}) ${user?.firstName} ${user?.lastName}`}</Typography>
                      )
                    })}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  );
}
