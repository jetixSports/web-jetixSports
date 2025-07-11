'use client'
import React, { useState } from 'react'
import useInscription from './useInscription'
import { Alert, Box, Dialog, DialogContent, Divider, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

import Background from '@/src/app/components/UX/Background/Background';
import Form from '@/src/app/components/UX/Form/Form';
import Buttons from '@/src/app/components/UX/Buttons/Buttons';
import PaymentMetod from '@/src/app/components/UX/Pay/PaymentMetod';
//import PaymentForm from '@/src/app/components/UX/Pay/PaymentForm';
import usePay from '@/src/app/Torneos/[_idTournament]/inscription/usePay';
import Inputs from '@/src/app/components/UX/Inputs/Inputs';
import { CancelOutlined } from '@mui/icons-material';

function App({ params }: { params: { _idTournament: string } }) {
  const { handleSubmit, tournament, status,fields,teams,watch ,users} = useInscription({ _idTournament: params._idTournament })
 const {handleSubmitPay, fieldss, errors, isloading} = usePay({ _idTournament: params._idTournament })
  const [persons,setPerson]=useState<string[]>([])
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setPerson(typeof value === 'string' ? value.split(',') : value);

  };
  const [showModalCreate, setShowModalCreate] = useState(false)

  return (
    <Box sx={{ width: '100%', marginTop: "190px" }}>
      <Background src="/backgrounds/torneo.svg"></Background>

      <Form styles={{ Box: { marginX: 'auto', marginY: 10 }, form: { width: '100%' } }}
        handleSubmit={handleSubmit}>
        <Typography sx={{ marginY: 1, fontWeight: 'bold', color: "white", textAlign: "center", fontSize: 24 }}>
          Inscribirse
        </Typography>
        <Typography sx={{ marginY: 1, fontWeight: 'bold', color: "white", textAlign: "center", }}>
          Torneo: {tournament?.name}
        </Typography>
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
          onChange={(e)=>{
            if(fields._idTeam)
              fields._idTeam.onChange(e)
            setPerson([])
          }}
          >
            {teams?.map((item,i)=><MenuItem key={i} value={item._id}>{item.name}</MenuItem>)}
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
            marginBottom:3,
          }}
          multiple
          value={persons}
          {...fields.playersMembers}
          onChange={handleChange}
          >
        {teams?.find(team=>team._id==watch('_idTeam'))?.members.map((_idUser) => {
          const user=users?.find(item=>item._id==_idUser)
          return(
            <MenuItem
              key={_idUser}
              value={_idUser}
            >
              {user?.firstName} {user?.lastName}
            </MenuItem>
          )})}
        </Select>

          <Divider flexItem sx={{borderColor:'white'}} />
          <Box sx={{color:'white', border:'1px',marginBottom:3, marginTop:'15px', display:'flex', flexDirection:'column',}}>
            <Typography sx={{marginTop:'8px'}}>Monto a Pagar</Typography>

            <Box sx={{display:'flex',justifyContent:'space-between', width:'100%'}}>
              <Typography sx={{marginTop:'8px'}}><strong>Total:</strong></Typography>
              <Typography>$<strong>{persons.length * 8}</strong></Typography>
            </Box>
            <Box sx={{display:'flex',justifyContent:'space-between', width:'100%'}}>
              <Typography sx={{ fontSize:'14px' }}>
              Numero de jugador
              </Typography>
              <Typography><strong>{persons.length}</strong></Typography>
            </Box>

           <Box sx={{display:'flex',justifyContent:'space-between', width:'100%'}}>
             <Typography sx={{ fontSize:'14px'  }}>
              Precio de Inscripcio:
             </Typography>
             <Typography sx={{ fontSize:'14px'  }}>
              <strong>$8</strong>
             </Typography>
           </Box>
          </Box>
           <Divider flexItem sx={{borderColor:'white'}} />
        <Box  sx={{marginBottom:'15px'}}>
          <PaymentMetod/>
        </Box>
          <Divider flexItem sx={{borderColor:'white'}} />
        <Box sx={{ width: "100%", gap: 2,marginY:"20px", display: 'flex', flexDirection: "column" }}>
          
          {isloading ? (
              <Buttons disabled={!status} type="submit" sx={{ marginTop: "5px" }} variant="contained">Inscribirse</Buttons>
          ):(
            <Buttons onClick={() => setShowModalCreate(true)} sx={{ color: "white" }}>Subir Pago</Buttons>
          )}

        </Box>
      </Form>

         {showModalCreate && <Box onClick={() => { setShowModalCreate(false)
            }} sx={{ zIndex: 10, position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backdropFilter: "blur(5px)", display: "flex",
              justifyContent: "center", alignItems: "flex-start", overflow: "hidden"
            }}>
          
             <Box sx={{
               marginTop: 15, maxHeight: "80vh", display: "flex", flexDirection: "column",
                borderRadius: "10px", position: "relative", overflow: "hidden"
                }} onClick={(e) => e.stopPropagation()}>
                <Box sx={{flex: 1, overflowY: "auto", '&::-webkit-scrollbar': { width: '6px', },
                  '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'white', borderRadius: '3px'}
                 }}>
                  <Box sx={{ position: "relative", width: "100%", display: 'flex', justifyContent: "end" }}>
                    <Box sx={{ position: "absolute", marginY: 4, marginX:4 }}>
                      <CancelOutlined onClick={() => {
                        setShowModalCreate(false) }} sx={{ color: "white", cursor: "pointer" }}>
                      </CancelOutlined>
                    </Box>
                  </Box>
                  <Box>
                    
                    <Form handleSubmit={handleSubmitPay}>
                      <Typography sx={{ color: "white" }}>Numero del referencia del Pago</Typography>
                      <Inputs type='number' {...fieldss.transactionCode}
                        error={!!errors?.transactionCode}
                        helperText={errors?.transactionCode?.message + ""}/>

                      <Typography sx={{ color: "white" }}>Monto pagado</Typography>
                      <Inputs type='number' {...fieldss.amount}
                        error={!!errors?.amount}
                        helperText={errors?.amount?.message + ""}/>

                      <Typography sx={{ color: "white" }}>Tasa de Cambio</Typography>
                      <Inputs type='number' {...fieldss.rateExchange}
                        error={!!errors?.rateExchange}
                        helperText={errors?.rateExchange?.message + ""}/>

                      <Typography sx={{ color: "white" }}>Divisa</Typography>
                      <Select
                        sx={{
                          width: "100%",
                          paddingX: "10px",
                          marginY: "5px",
                          backgroundColor: "#20105B",
                          borderRadius: "10px",
                          color: "white",
                          height: 36,
                          marginBottom:3,
                        }} {...fieldss.currency}
                        error={!!errors?.currency}
                          >
                        <MenuItem key='Dolares'  value='Dolares'>
                          Dolares
                        </MenuItem>
                        <MenuItem key='Euros'  value='Euros'>
                          Euros
                        </MenuItem>
                        <MenuItem key='Bolivares'  value='Bolivares'>
                          Bolivares
                        </MenuItem>
                          
                      </Select>

                      <Typography sx={{ color: "white" }}>Cargar Captura del Pago</Typography>
                      <Inputs
                      type="file"
                      sx={{ width: "100%", height: 36 }}
                      {...fieldss.file}
                      error={!!errors?.file}
                      helperText={errors?.file?.message + ""}
                      />

                      <Alert  sx={{marginTop:'15px'}} severity="warning" icon={<WarningRoundedIcon />}>
                        Tu inscripcion se procesara una vez el organizador haya verificado el Pago.
                      </Alert>
                      <Buttons disabled={!status} type="submit" sx={{ marginTop: "15px", width:'100%' }} variant="contained">Enviar Pago</Buttons>
                    </Form>
                  </Box>
                </Box>
              </Box>
        </Box>}

      </Box>
    
  )
}

export default App