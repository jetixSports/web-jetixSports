"use client"
import { useState } from 'react';
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
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper
} from '@mui/material';
import { ExpandMore, ExpandLess, SportsEsports, People, LiveTv } from '@mui/icons-material';
import Background from '../../components/UX/Background/Background';
import useIdTournament from './useIdTournament';
import { Teams, Tournaments } from '../../(auth)/dashboard/dashboard.types';
import { Match } from '../../types/matchs.types';

interface HookTour {
  users: { _id: string, firstName: string, lastName: string }[] | null,
  tournament: Tournaments | null,
  teams: Teams[] | null,
  matchs: Match[] | null
}
export default function TournamentView({ params: { _idTournament } }: { params: { _idTournament: string } }) {
  const hookIdTour = useIdTournament({ _idTournament })
  const [activeTab, setActiveTab] = useState(0);
  const [expandedRounds, setExpandedRounds] = useState<number[]>([]);

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

  return (
    <Box sx={{ paddingTop: 15, display: 'flex', justifyContent: "center" }}>
      <Background sx={{ backgroundColor: '#270E60' }}></Background>
      <Box sx={{ maxWidth: 900, width: "90%", marginBottom: 3 }}>
        <Typography variant="h4" gutterBottom color="white">
          {hookIdTour.tournament?.name}
        </Typography>
        <Typography variant="h6" gutterBottom color="white">
          {hookIdTour.tournament?.description}
        </Typography>
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
            />
          )}

          {activeTab === 1 && <TeamsSection hookTour={hookIdTour} />}
        </Box>
      </Box>
    </Box>
  );
}

function RoundsSection({ expandedRounds, toggleRound, hookTour }: {
  expandedRounds: number[],
  toggleRound: (id: number) => void,
  hookTour: HookTour
}) {
  const { tournament, matchs, teams } = hookTour
  return (
    <Box>
      <Typography variant="h5" gutterBottom color="white">
        Progreso del Torneo
      </Typography>
      {tournament?.rounds?.length == 0 && <Box sx={{ marginY: 3 }}> <Typography sx={{ textAlign: "center", color: "white" }}>Este torneo no posee ninguna ronda</Typography></Box>}
      {tournament?.rounds.map((round, i) => (
        <Card key={i} sx={{ mb: 2 }}>
          <CardHeader
            sx={{ cursor: 'pointer' }}
            title={"Ronda " + round.nRound}
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
                  return (
                    <Grid key={j}>
                      <Paper elevation={2} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom >
                          Encuentro {j + 1}
                        </Typography>
                        {match.teams.map((matchTeam, k) => {
                          const team = teams?.find((t) => t._id == matchTeam._idTeam)
                          return <Box key={k} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography>{team?.name + ' '} </Typography>
                            <Typography>{matchTeam.score || '-'}</Typography>
                          </Box>
                        })}
                        <Box sx={{ mt: 1, textAlign: 'center' }}>
                          <Chip
                            label={`Ganador: ${teamWinner}`}
                            color="success"
                            size="small"
                          />
                        </Box>
                      </Paper>
                    </Grid>
                  )
                })}
              </Grid>
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
                  subheader={`Ronda actual: ${onlyRound?.nRound??'-'}`}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Miembros:
                  </Typography>
                  <Box sx={{paddingLeft:2}}>
                    {team.members.map((_idUser, index) => {
                      const user=users?.find(u=>u._id==_idUser)
                      return (
                        <Typography key={index}>{`${index+1}) ${user?.firstName} ${user?.lastName}`}</Typography>
                    )})}
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
