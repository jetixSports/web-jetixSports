'use client'
import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Typography, Box, Select, MenuItem, CircularProgress,
  Tooltip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CheckOutlined, CancelOutlined, Visibility } from '@mui/icons-material';

import Buttons from '@/src/app/components/UX/Buttons/Buttons';
import usePayments from './usePayments';
import Background from '@/src/app/components/UX/Background/Background';
import Image from 'next/image';

const statusMap = {
  pending: 'Pendiente',
  accept: 'Aceptado',
  denied: 'Rechazado'
};

export default function Payments({ params: { _idTournament } }: { params: { _idTournament: string } }) {
  const [paymentDialogData, setPaymentDialogData] = useState<{
    accepted: boolean, _idPayment: string, teamName: string
  } | null>(null);
  const [imgShow, setImgShow] = useState<string | null>(null)
  const {
    payments,
    teams,
    loading,
    setFilter,
    ReactDialog,
    tournament
  } = usePayments({
    tournamentId: _idTournament,
    dialogData: paymentDialogData,
    setDialogData: setPaymentDialogData
  });


  const [localFilter, setLocalFilter] = useState({ status: 'Todos' });

  const handleFilterChange = () => {
    const appliedFilter = localFilter.status === 'Todos'
      ? {}
      : { status: localFilter.status };

    setFilter(appliedFilter);
  };

  return (
    <Box sx={{
      width: "100%",
      display: 'flex',
      alignItems: "center",
      flexDirection: "column",
      color: "white",
      minHeight: "90vh",
      backgroundColor: "#00003D",
      paddingTop: 15
    }}>
      {imgShow && <Box onClick={() => {
        setImgShow(null)
      }} sx={{ zIndex: 10, paddingTop: 5, top: 0, left: 0, position: "fixed", width: "100%", height: "100%", backdropFilter: "blur(5px)", display: "flex", "justifyContent": "center" }}>
        <Box sx={{ marginY: 5 }} onClick={(e) => e.stopPropagation()}>
          <Box sx={{ position: "relativo", width: "100%", display: 'flex', justifyContent: "end" }}>
            <Box sx={{ position: "absolute", margin: 4, }}><CancelOutlined onClick={() => {
              setImgShow(null)
            }} sx={{ color: "white", cursor: "pointer" }}></CancelOutlined> </Box>
          </Box>
          <Box sx={{
            maxWidth: "380px",
            minWidth: "210px",
            maxHeight: "550px",
            marginX: { xs: 1, sm: 2 },
            marginY: { xs: 1, sm: 2 },
            paddingX: { xs: 4, sm: 5 },
            paddingY: { xs: 2, sm: 3 },
            backgroundColor: "#00003D",
            border: "solid white 1px",
            borderRadius: "14px",
          }}>
            <Image
              src={process.env.NEXT_PUBLIC_HOST_SERVICE + "/images/pay/" + imgShow}
              height={80}
              width={128}
              alt={"fondo"}
              className={"w-full h-full"}
              unoptimized={true}
            ></Image>
          </Box>
        </Box>
      </Box>}
      <Background sx={{ backgroundColor: '#00003d' }} />
      {ReactDialog}

      <Box sx={{ width: "90%", maxWidth: 1000, marginBottom: 4 }}>
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
                }}>
                  <ArrowBackIcon />
                  <Typography>Volver a Torneo</Typography>
              </IconButton>
            </Tooltip>
         </Box>
        <TableContainer component={Paper} sx={{ backgroundColor: "#20105b" }}>
          <Box sx={{ display: 'flex', margin: 1, flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ p: 2, color: "white" }}>
              Gestión de Pagos
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', p: 1 }}>
              <Typography sx={{ color: "white" }}>Filtrar por Estado:</Typography>
              <Select
                value={localFilter.status}
                onChange={(e) => setLocalFilter({ status: e.target.value })}
                sx={{
                  backgroundColor: "#070744",
                  borderRadius: "10px",
                  color: "white",
                  minWidth: 120,
                  height: 36,
                }}
              >
                <MenuItem value="Todos">Todos</MenuItem>
                {Object.entries(statusMap).map(([key, value]) => (
                  <MenuItem key={key} value={key}>{value}</MenuItem>
                ))}
              </Select>

              <Buttons
                onClick={handleFilterChange}
                sx={{
                  color: "white",
                  height: 36,
                  px: 3
                }}
              >
                Filtrar
              </Buttons>
            </Box>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress color="secondary" />
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "white" }}><strong>Equipo</strong></TableCell>
                  <TableCell sx={{ color: "white" }}><strong>Referencia</strong></TableCell>
                  <TableCell sx={{ color: "white" }}><strong>Tasa</strong></TableCell>
                  <TableCell sx={{ color: "white" }}><strong>Monto</strong></TableCell>
                  <TableCell sx={{ color: "white" }}><strong>Moneda</strong></TableCell>
                  <TableCell sx={{ color: "white" }}><strong>Estado</strong></TableCell>
                  <TableCell sx={{ color: "white" }}><strong>Acciones</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.length > 0 ? (
                  payments.map((payment) => {
                    const teamTour = tournament?.teams?.find(t => payment._id == t._idPayments)
                    const team = teams.find(t => t._id === teamTour?._idTeam);
                    const teamName = team?.name || 'Desconocido';

                    return (
                      <TableRow key={payment._id} hover>
                        <TableCell sx={{ color: "white" }}>{teamName}</TableCell>
                        <TableCell sx={{ color: "white" }}>{payment.transactionCode}</TableCell>
                        <TableCell sx={{ color: "white" }}>{payment.rateExchange}</TableCell>
                        <TableCell sx={{ color: "white" }}>{payment.amount.toFixed(2)}</TableCell>
                        <TableCell sx={{ color: "white" }}>{payment.currency}</TableCell>
                        <TableCell sx={{ color: "white" }}>
                          {statusMap[payment.status]}
                        </TableCell>
                        <TableCell sx={{ color: "white" }}>
                          {payment.status === 'pending' && (
                            <>
                              <IconButton
                                onClick={() => setPaymentDialogData({
                                  _idPayment: payment._id,
                                  accepted: true,
                                  teamName
                                })}
                                color="success"
                              >
                                <CheckOutlined />
                              </IconButton>
                              <IconButton
                                onClick={() => setPaymentDialogData({
                                  _idPayment: payment._id,
                                  accepted: false,
                                  teamName
                                })}
                                color="error"
                              >
                                <CancelOutlined />
                              </IconButton>
                            </>
                          )}
                          {payment._idImg && (
                            <IconButton
                              onClick={() => setImgShow(payment._idImg ?? null)}
                              color="info"
                            >
                              <Visibility />
                            </IconButton>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ color: "white", textAlign: "center" }}>
                      No se encontraron pagos
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Box>
    </Box>
  );
}