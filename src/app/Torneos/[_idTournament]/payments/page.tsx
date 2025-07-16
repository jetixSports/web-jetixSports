'use client'
import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Typography, Box, Select, MenuItem, CircularProgress
} from '@mui/material';
import { CheckOutlined, CancelOutlined, Visibility } from '@mui/icons-material';
import Buttons from '@/src/app/components/UX/Buttons/Buttons';
import usePayments from './usePayments'; 
import Background from '@/src/app/components/UX/Background/Background';

const statusMap = {
  pending: 'Pendiente',
  accepted: 'Aceptado',
  denied: 'Rechazado'
};

export default function Payments({ _idTournament }: { _idTournament: string }) {
  const [paymentDialogData, setPaymentDialogData] = useState<{
    accepted: boolean, _idPayment: string, teamName: string
  } | null>(null);

  const { 
    payments, 
    teams, 
    loading, 
    setFilter, 
    ReactDialog 
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
      <Background sx={{ backgroundColor: '#00003d' }} />
      {ReactDialog}

      <Box sx={{ width: "90%", maxWidth: 1000, marginBottom: 4 }}>
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
                    const team = teams.find(t => t._id === payment._idTeam);
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
                              onClick={() => window.open(payment._idImg, '_blank')}
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