'use client'
import React, { useState } from 'react'
import useInscription from './useInscription'
import { Box, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import Background from '@/src/app/components/UX/Background/Background'
import Form from '@/src/app/components/UX/Form/Form'
import Buttons from '@/src/app/components/UX/Buttons/Buttons'

function App({ params }: { params: { _idTournament: string } }) {
  const { handleSubmit, tournament, status, fields, teams, watch, users } = useInscription({ _idTournament: params._idTournament })
  const [persons, setPerson] = useState<string[]>([])
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setPerson(typeof value === 'string' ? value.split(',') : value);
  };
  return (
    <Box sx={{ width: '100%', marginTop: "190px" }}>
      <Background src="/backgrounds/login.svg"></Background>

      <Form styles={{ Box: { marginX: 'auto', marginY: 10 }, form: { width: '100%' } }}
        handleSubmit={handleSubmit}>
        <Typography sx={{ marginY: 1, fontWeight: 'bold', color: "white", textAlign: "center", fontSize: 24 }}>
          Inscribirse
        </Typography>
        <Typography sx={{ marginY: 1, fontWeight: 'bold', color: "white", textAlign: "center", }}>
          Torneo: {tournament?.name}
        </Typography>
        {(teams?.length ?? 0) < 1 && <>
          <Typography sx={{ color: "red", textAlign: "center" }}>No posees ningun equipo que registrar</Typography>
        </>}
        <Typography sx={{ color: "white" }}>Equipo:</Typography>
        <Select
          sx={{
            width: "100%",
            paddingX: "10px",
            marginY: "5px",
            backgroundColor: "#20105B",
            borderRadius: "10px",
            color: "white",
            height: 36,
          }}
          {...fields._idTeam}
          onChange={(e) => {
            if (fields._idTeam)
              fields._idTeam.onChange(e)
            setPerson([])
          }}
        >
          {teams?.map((item, i) => <MenuItem key={i} value={item._id}>{item.name}</MenuItem>)}
        </Select>
        <Typography sx={{ color: "white" }}>Integrantes:</Typography>
        <Select
          sx={{
            width: "100%",
            paddingX: "10px",
            marginY: "5px",
            backgroundColor: "#20105B",
            borderRadius: "10px",
            color: "white",
            height: 36,
          }}
          multiple
          value={persons}
          {...fields.playersMembers}
          onChange={handleChange}
        >
          {teams?.find(team => team._id == watch('_idTeam'))?.members.map((_idUser) => {
            const user = users?.find(item => item._id == _idUser)
            return (
              <MenuItem
                key={_idUser}
                value={_idUser}
              >
                {user?.firstName} {user?.lastName}
              </MenuItem>
            )
          })}
        </Select>
        <Box sx={{ width: "100%", gap: 2, marginY: "20px", display: 'flex', flexDirection: "column" }}>
          <Buttons disabled={!status} type="submit" sx={{ marginTop: "5px" }} variant="contained">Inscribirse</Buttons>
        </Box>
      </Form>
    </Box>
  )
}

export default App