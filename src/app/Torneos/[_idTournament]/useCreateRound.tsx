'use client'
import React, { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Buttons from '../../components/UX/Buttons/Buttons'
import { Box, Typography } from '@mui/material'
import Inputs from '../../components/UX/Inputs/Inputs'
import Form from '../../components/UX/Form/Form'
import { Rounds, Teams, Tournaments } from '../../(auth)/dashboard/dashboard.types'
import BoxSelect from '../../components/UX/BoxSelect/BoxSelect'

function useCreateRound({ tournament, teams,callback }: { tournament: Tournaments | null, teams: Teams[] | null ,callback?:()=>any}) {
  const { post } = useFetch()
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const [status, setStatus] = useState(true)
  const lastRound = tournament?.rounds.reduce((acc, item) => (!acc?.nRound || item.nRound > acc.nRound) ? item : acc, null as null | Rounds)
  const onlyTeams = (lastRound?.teamsWinners ?? tournament?.teams.map(t => t._idTeam) ?? [])
  const teamsValues = onlyTeams.map((team) => ({ value: team, name: teams?.find(t => t._id == team)?.name }))
  const [selectedTeams, setSelectedTeams] = useState<string[][]>([])
  const fields = {
    teamsPass: register("teamsPass"),
  }
  const onSubmit = async (data: { [key: string]: string | string[] }) => {
    if (!status)
      return
    try {
      setStatus(false)
      let errors = ''
      const matchs = (onlyTeams.slice(0, Math.floor(onlyTeams.length / 2))).reduce((acc, item, index) => {
        if (errors != '') return acc
        if (!data['match_' + index] || data['match_' + index] == '') return acc
        if (data['match_' + index].length < 2) {
          errors = 'No se emparejo bien el encuentro ' + (index + 1)
          return acc
        }
        const matchDate = new Date(String(data?.['date_' + index]) + ' ' + data?.['time_' + index])
        if (matchDate + '' == 'Invalid Date') {
          errors = 'Fecha mal creada en el encuentro  ' + (index + 1)
          return acc
        }
        acc.push({
          initMatch: matchDate.getTime(),
          teams: data['match_' + index]
        })
        return acc
      }, [] as any)
      if (errors != '')
        return toast.error(errors)
      const res = await post(
        process.env.NEXT_PUBLIC_HOST_SERVICE + "/tournaments/createRound",
        {
          _idTournament: tournament?._id,
          typeSport: tournament?.typeSport,
          matchs,
          teamsPass: data?.teamsPass ?? []
        }
      );
      setStatus(true)
      if (res.statusCode != 200)
        return toast.error(res.message)
      toast.success(res.message)
      if(callback)
        callback()
    } catch (error) {
      toast.error(error + "")
      setStatus(true)
    }
  }
  function genMatch() {
    const mount = teamsValues.length 
    const numbersArr = Array.from({ length: mount  }, (_, i) => i);
    const result = [];

    for (let i = 0; i < mount; i++) {
      const randomIndex = Math.floor(Math.random() * numbersArr.length);
      const selectedNumber = numbersArr.splice(randomIndex, 1)[0];
      result.push(onlyTeams[selectedNumber]);
    }
    const matchs = []
    for (let i = 0; i < result.length; i += 2) {
      const group = result.slice(i, i + 2);
      matchs.push(group);
    }
    setSelectedTeams(matchs)
  }
  return {
    reset: () => setSelectedTeams([]),
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
          Crear Ronda
        </Typography>
        <Typography sx={{ color: "white" }}>Equipos Adelantados</Typography>
        <BoxSelect
            setValue={setValue}
          options={teamsValues}
          valuesDisabled={selectedTeams.flat(2)}
          externalValue={selectedTeams[onlyTeams.slice(0, Math.floor(onlyTeams.length / 2)).length]}
          onChange={(e) => {
            const newSelect = [...selectedTeams]
            newSelect[onlyTeams.slice(0, Math.floor(onlyTeams.length / 2)).length] = (typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)
            setSelectedTeams(newSelect)
          }}
          field={fields.teamsPass}
        ></BoxSelect>
        {(onlyTeams.slice(0, Math.floor(onlyTeams.length / 2))).map((item, index: number) => {
          return <Box key={index}><Typography sx={{ color: "white" }}>Encuentro {index + 1}</Typography>
            <BoxSelect
            setValue={setValue}
              options={teamsValues}
              valuesDisabled={selectedTeams.flat(2)}
              externalValue={selectedTeams[index]}
              onChange={(e) => {
                const newSelect = [...selectedTeams]
                newSelect[index] = (typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)
                setSelectedTeams(newSelect)
              }}
              field={register('match_' + index)}
            ></BoxSelect>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Box sx={{ width: "100%" }}>
                <Typography sx={{ color: "white" }}>Fecha {index + 1}</Typography>
                <Inputs type='date' {...register('date_' + index)}></Inputs>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography sx={{ color: "white" }}>Hora {index + 1}</Typography>
                <Inputs type='time' {...register('time_' + index)}></Inputs>
              </Box>
            </Box>
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
            type="button"
            sx={{ marginTop: "5px", }}
            variant="contained"
            onClick={genMatch}
          >
            Generar
          </Buttons>
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

export default useCreateRound

