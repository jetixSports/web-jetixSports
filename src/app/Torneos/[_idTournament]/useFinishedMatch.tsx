'use client'
import React, { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Buttons from '../../components/UX/Buttons/Buttons'
import { Box, MenuItem, Select, Typography } from '@mui/material'
import Inputs from '../../components/UX/Inputs/Inputs'
import Form from '../../components/UX/Form/Form'
import { Rounds, Teams, Tournaments } from '../../(auth)/dashboard/dashboard.types'
import BoxSelect from '../../components/UX/BoxSelect/BoxSelect'
import { Match } from '../../types/matchs.types'

function useFinishedMatch({ match, teams, _idUser, callback }: { match: Match | null, teams: Teams[] | null, _idUser: string, callback?: () => any }) {
  const { post } = useFetch()
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [status, setStatus] = useState(true)
  const fields = {
    _idTeamWinner: register("_idTeamWinner", { required: "El equipo ganador es obligatorio" }),
    duration: register("duration", { required: "La duración es obligatoria" }),
  }
  const onSubmit = async (data: { [key: string]: string }) => {
    if (!status)
      return
    try {
      setStatus(false)
      const { duration, _idTeamWinner, ...teamsPoints } = data
      const scoreTeams = Object.entries(teamsPoints).map(([key, value]) => ({
        _idTeam: key,
        score: value
      }))
      const res = await post(
        process.env.NEXT_PUBLIC_HOST_SERVICE + "/tournaments/finishedMatch",
        {
          _idMatch: match?._id,
          _idTournament: match?._idTournament,
          scoreTeams,
          duration: Number(duration),
          _idTeamWinner,
          _idUser
        }
      );
      setStatus(true)
      if (res.statusCode != 200)
        return toast.error(res.message)
      toast.success(res.message)
      if (callback)
        callback()
    } catch (error) {
      toast.error(error + "")
      setStatus(true)
    }
  }

  return {
    reset,
    reactForm: (
      <Form handleSubmit={handleSubmit(onSubmit as any)}>
        <Typography
          sx={{
            marginY: 1,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            fontSize: 24,
          }}
        >
          Finalizar Encuentro
        </Typography>
        <Box ><Typography sx={{ color: "white" }}>Equipo Ganador</Typography>
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
            {...fields._idTeamWinner}
          >
            {match?.teams?.map((item, i) => <MenuItem key={i} value={item._idTeam}>{teams?.find((t) => t._id == item._idTeam)?.name}</MenuItem>)}
          </Select>
        </Box>
        <Box><Typography sx={{ color: "white" }}>Duración (en minutos)</Typography>
          <Inputs
            type="number"
            sx={{ width: "100%", height: 36 }}
            {...fields.duration}
            error={!!errors?.duration}
            helperText={errors?.duration?.message + ""}
          ></Inputs>
        </Box>
        {match?.teams.map((item, index: number) => {
          const team = teams?.find((t) => t._id == item._idTeam)
          return <Box key={index}><Typography sx={{ color: "white" }}>Puntuación del equipo {team?.name}</Typography>
            <Inputs
              type="number"
              sx={{ width: "100%", height: 36 }}
              {...register(item._idTeam, { required: "La puntuación es obligatorio" })}
              error={!!errors?.[item._idTeam]}
              helperText={errors?.[item._idTeam]?.message + ""}
            ></Inputs>
          </Box>
        })}
        <Box
          sx={{
            minWidth: "290px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Buttons
            type="submit"
            sx={{ marginTop: "5px", marginLeft: "auto" }}
            variant="contained"
          >
            Guardar
          </Buttons>
        </Box>
      </Form>
    ),
  };
}

export default useFinishedMatch

