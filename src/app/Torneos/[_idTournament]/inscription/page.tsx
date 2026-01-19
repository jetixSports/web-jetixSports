'use client'
import React, { SetStateAction, useState } from 'react'
import useInscription from './useInscription'
import { Alert, Box, Dialog, DialogContent, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Tooltip, Typography } from '@mui/material'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Background from '@/src/app/components/UX/Background/Background';
import Form from '@/src/app/components/UX/Form/Form';
import Buttons from '@/src/app/components/UX/Buttons/Buttons';
import usePay from '@/src/app/Torneos/[_idTournament]/inscription/usePay';
import Inputs from '@/src/app/components/UX/Inputs/Inputs';
import { CancelOutlined } from '@mui/icons-material';
import useMethodOne from '@/src/app/MethodPay/useMethodOne';
import useCurrency from '@/src/app/Currency/useCurrency';
import PaymentMetod from '@/src/app/hooks/usePaymentMethod';
import usePaymentMethod from '@/src/app/hooks/usePaymentMethod';
import toast from 'react-hot-toast';
import useFetch from '@/src/app/hooks/useFetch';
import { useSession } from 'next-auth/react';
import Torneos from '../../page';

function App({ params }: { params: { _idTournament: string } }) {
  const { post } = useFetch()
  const { data: session, status: sessionStatus } = useSession();
  const user = session?.user;
  const { handleSubmit, tournament, status, fields, teams, watch, users, payDetails, getValues } = useInscription({ _idTournament: params._idTournament })
  const { handleSubmitPay, fieldss, errors, isloading } = usePay({
    _idTournament: params._idTournament, async inscribeCallback() {
      try {
        const { _idTeam,
          playersMembers, } = getValues()
        const loadingToast = toast.loading("Inscribiendo..");
        const res = await post(
          process.env.NEXT_PUBLIC_HOST_SERVICE + "/tournaments/inscribe/",
          {
            _idTeam,
            playersMembers: Array.isArray(playersMembers)
              ? playersMembers
              : [playersMembers],
            _idTournament: params._idTournament,
            _idUser: user?._id,
          }
        );
        return res
      } catch (error: any) {
        return { statusCode: 500, message: error.message }
      }

    },
  })
  const [persons, setPerson] = useState<string[]>([])
  const [showModalCreate, setShowModalCreate] = useState(false)
  const { currencies, loading, error } = useCurrency()
  const payMethodsHook = usePaymentMethod({ payments: payDetails })
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setPerson(typeof value === 'string' ? value.split(',') : value);

  };


  let amout = tournament?.amount
  if (amout == null) {
    amout = 0;
  }
  return (
    <Box sx={{ width: '100%', marginTop: "190px" }}>
      <Background src="/backgrounds/torneo.svg"></Background>
      
      <Form styles={{ Box: { marginX: 'auto', marginY: 10}, form: { width: '100%' } }}
        handleSubmit={handleSubmit}>
          <Box sx={{width:'100%'}}>
            <Tooltip title="Volver a Torneo">
              <IconButton 
                  href={`/Torneos/${tournament?._id}`}
                  color="secondary"
                  aria-label="Volver a Torneo"
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ArrowBackIcon />
                  <Typography>Volver a Torneo</Typography>
              </IconButton>
            </Tooltip>
        </Box>
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
            backgroundColor: "rgb(32 34 103)",
            borderRadius: "10px",
            color: "white",
            height: 36,
            marginBottom: 3,
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

        <Divider flexItem sx={{ borderColor: 'white' }} />
        <Box sx={{ color: 'white', border: '1px', marginBottom: 3, marginTop: '15px', display: 'flex', flexDirection: 'column', }}>
          <Typography sx={{ marginTop: '8px' }}>Monto a Pagar</Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Typography sx={{ marginTop: '8px' }}><strong>Total:</strong></Typography>
            <Typography>$<strong>{amout}</strong></Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Typography sx={{ fontSize: '14px' }}>
              Numero de jugador
            </Typography>
            <Typography><strong>{persons.length}</strong></Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Typography sx={{ fontSize: '14px' }}>
              Precio de Inscripción:
            </Typography>
            <Typography sx={{ fontSize: '14px' }}>
              <strong>${amout}</strong>
            </Typography>
          </Box>
        </Box>
        <Divider flexItem sx={{ borderColor: 'white' }} />
        <Box sx={{ marginBottom: '15px' }}>

          {payMethodsHook?.ReactNode}
        </Box>
        <Divider flexItem sx={{ borderColor: 'white' }} />
        <Box sx={{ width: "100%", gap: 2, marginY: "20px", display: 'flex', flexDirection: "column" }}>

          {isloading ? (
            <Buttons disabled={!status} type="submit" sx={{ marginTop: "5px" }} variant="contained">Inscribirse</Buttons>
          ) : (
            <Buttons onClick={() => setShowModalCreate(true)} sx={{ color: "white" }}>Subir Pago</Buttons>
          )}

        </Box>
      </Form>

      {showModalCreate && <Box onClick={() => {
        setShowModalCreate(false)
      }} sx={{
        zIndex: 10, position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backdropFilter: "blur(5px)", display: "flex",
        justifyContent: "center", alignItems: "flex-start", overflow: "hidden"
      }}>

        <Box sx={{
          marginTop: 15, maxHeight: "80vh", display: "flex", flexDirection: "column",
          borderRadius: "10px", position: "relative", overflow: "hidden"
        }} onClick={(e) => e.stopPropagation()}>
          <Box sx={{
            flex: 1, overflowY: "auto", '&::-webkit-scrollbar': { width: '6px', },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'white', borderRadius: '3px'
            }
          }}>
            <Box sx={{ position: "relative", width: "100%", display: 'flex', justifyContent: "end" }}>
              <Box sx={{ position: "absolute", marginY: 4, marginX: 4 }}>
                <CancelOutlined onClick={() => {
                  setShowModalCreate(false)
                }} sx={{ color: "white", cursor: "pointer" }}>
                </CancelOutlined>
              </Box>
            </Box>
            <Box>

              <Form handleSubmit={handleSubmitPay}>
                <Typography sx={{ color: "white" }}>Numero del referencia del Pago</Typography>
                <Inputs
                  placeholder='Ultimos 6 numeros'
                  {...fieldss.transactionCode}
                  error={!!errors?.transactionCode}
                  helperText={errors?.transactionCode?.message + ""} />

                <Typography sx={{ color: "white" }}>Monto pagado</Typography>
                <Inputs
                  placeholder='Ej. 523.23'
                  type='number'
                  {...fieldss.amount}
                  error={!!errors?.amount}
                  helperText={errors?.amount?.message + ""} />

                <Typography sx={{ color: "white" }}>Selecione la divisa del pago</Typography>
                <Select
                  sx={{
                    width: "100%",
                    paddingX: "10px",
                    marginY: "5px",
                    backgroundColor: "#20105B",
                    borderRadius: "10px",
                    color: "white",
                    height: 36,
                    marginBottom: 3,
                  }} {...fieldss.currency}
                  error={!!errors?.currency}
                >
                  {currencies.map((currency, i) => (
                    <MenuItem key={i} value={currency.name}>
                      {currency.name}
                    </MenuItem>
                  ))}
                </Select>

                <Typography sx={{ color: "white" }}>Tasa de Cambio</Typography>
                <Inputs
                  placeholder='Ej. 100.23'
                  type='number'
                  {...fieldss.rateExchange}
                  error={!!errors?.rateExchange}
                  helperText={errors?.rateExchange?.message + ""} />

                <Typography sx={{ color: "white" }}>Captura del pago</Typography>
                <Inputs
                  type='file'
                  {...fieldss._idImg}
                  error={!!errors?._idImg}
                  helperText={errors?._idImg?.message + ""} />

                <Alert sx={{ marginTop: '15px' }} severity="warning" icon={<WarningRoundedIcon />}>
                  Tu inscripcion se procesara una vez el organizador haya verificado el Pago.
                </Alert>
                <Buttons disabled={!status} type="submit" sx={{ marginTop: "15px", width: '100%' }} variant="contained">Enviar Pago</Buttons>
              </Form>
            </Box>
          </Box>
        </Box>
      </Box>}

    </Box>

  )
}

export default App