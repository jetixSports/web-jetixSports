'use client'
import React, { use, useState } from 'react'
import { Box, Pagination, Stack, Table, TableBody, TableContainer, TableRow, Button, Typography, TableCell, TableHead, IconButton, Paper, Alert } from '@mui/material'
import DeleteIcon from "@mui/icons-material/Delete";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import toast from 'react-hot-toast';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

import { useSession } from 'next-auth/react'
import useCurrencyAdd from './useCurrencyAdd';
import useCurrency from './useCurrency';
import { CancelOutlined } from '@mui/icons-material';
import Form from '../components/UX/Form/Form';
import Inputs from '../components/UX/Inputs/Inputs';
import Buttons from '../components/UX/Buttons/Buttons';
import Background from '../components/UX/Background/Background';
import useFetch from '../hooks/useFetch';

export default function Currency() {
  const fetchHook = useFetch()
  const [status, setStatus] = useState(true)
  const [showModalCurrencyAdd, setShowModalCurrencyAdd] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [deleteData, setDeleteData] = useState<string | null>(null);

  const CurrencyHook = useCurrency()
  const { currencies, loading, error, refresh } = useCurrency()
  const { handleSubmitCurrency, fields, errors, isSubmittingCurrency } = useCurrencyAdd({ callback: refresh })

  React.useEffect(() => {
    if (isSubmittingCurrency) {
      setShowModalCurrencyAdd(false);
    }
  }, [isSubmittingCurrency]);

  const handleDeleteClick = (CurrencyId: string) => {
    setDeleteData(CurrencyId);
    setShowModalDelete(true);
  };

  const closeModal = () => {
    setShowModalDelete(false);
    setDeleteData(null);
  };

  return (
    <Box sx={{ width: "100%", display: 'flex', alignItems: "center", flexDirection: "column", minHeight: "84.1vh", backgroundColor: "#04082a", paddingTop: 15 }}>
      <Background sx={{ backgroundColor: '#04082a' }} />
      <Box sx={{ width: "80%", maxWidth: 900, marginBottom: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={() => setShowModalCurrencyAdd(true)} variant="contained" color="success" startIcon={<MonetizationOnIcon />} sx={{ mb: 2 }}>
          Agregar Divisa
        </Button>
      </Box>

      <Box sx={{ width: "80%", maxWidth: 900, marginBottom: 4 }}>
        <TableContainer component={Paper} sx={{ backgroundColor: "#20105b" }}>
          <Typography variant="h6" sx={{ p: 2, color: "white" }}>Lista de Divisas</Typography>
          <Table aria-label="Tabla de métodos de pago">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "white" }}><strong>Divisa</strong></TableCell>
                <TableCell sx={{ color: "white" }}><strong>Abreviatura</strong></TableCell>
                <TableCell sx={{ color: "white" }}><strong>Simbolo</strong></TableCell>
                <TableCell sx={{ color: "white" }}><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} sx={{ color: 'white', textAlign: 'center' }}>
                    Cargando...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={4} sx={{ color: 'white', textAlign: 'center' }}>
                    {error}
                  </TableCell>
                </TableRow>
              ) : currencies && currencies.length > 0 ? (
                currencies.map((currency) => (
                  <TableRow key={currency._id} hover>

                    <TableCell sx={{ color: 'white' }}>
                      {currency.name}
                    </TableCell>
                    <TableCell sx={{ color: 'white' }}>
                      {currency.shortname}
                    </TableCell>
                    <TableCell sx={{ color: 'white' }}>
                      {currency.code}
                    </TableCell>

                    {/* <TableCell sx={{ color: 'white' }}>
                                    <IconButton onClick={() => handleEditClick(currencies._id)}   aria-label="editar" color="primary">
                                    <EditIcon />
                                    </IconButton>
                                </TableCell> */}
                    <TableCell sx={{ color: 'white' }}>
                      <IconButton onClick={() => handleDeleteClick(currency._id)} aria-label="eliminar" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} sx={{ color: 'white', textAlign: 'center' }}>
                    No hay Divisas registradas
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {showModalCurrencyAdd && <Box onClick={() => {
        setShowModalCurrencyAdd(false);
      }} sx={{ zIndex: 10, paddingTop: 5, top: 0, left: 0, position: "fixed", width: "100%", height: "100%", backdropFilter: "blur(5px)", display: "flex", "justifyContent": "center" }}>
        <Box sx={{ marginTop: 15, height: '200px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }} onClick={(e) => e.stopPropagation()}>
          <Box sx={{ position: "relativo", width: "100%", display: 'flex', justifyContent: "end", backgroundColor: '#04082a', marginBottom: '10px' }}>
            <Box sx={{ position: "absolute", margin: 10 }}>
              <CancelOutlined onClick={() => {
                setShowModalCurrencyAdd(false)
              }} sx={{ color: "white", cursor: "pointer" }}>
              </CancelOutlined>
            </Box>
          </Box>
          <Box sx={{ margin: '30px', width: '400px', height: '200px' }} >
            <Form handleSubmit={handleSubmitCurrency}>
              <Typography sx={{ marginY: 1, fontWeight: "bold", color: "white", textAlign: "center", fontSize: 24, }} >
                Agregar Divisa
              </Typography>
              <Typography sx={{ color: "white" }}>Nombre de la Divisa</Typography>
              <Inputs
                placeholder='Ej. Dolar'
                sx={{ width: "100%", height: 36 }}
                {...fields?.name}
                error={!!errors?.name}
                helperText={errors?.name?.message + ""}
              />

              <Typography sx={{ color: "white" }}>Abreviatura</Typography>
              <Inputs
                placeholder='Ej. USD'
                sx={{ width: "100%", height: 36 }}
                {...fields.shortname}
                error={!!errors?.shortname}
                helperText={errors?.shortname?.message + ""}
              />

              <Typography sx={{ color: "white" }}>Simbolo</Typography>
              <Inputs
                placeholder='Ej. $'
                sx={{ width: "100%", height: 36 }}
                {...fields.code}
                error={!!errors?.code}
                helperText={errors?.code?.message + ""}
              />
              <Box sx={{ minWidth: "290px", display: "flex", justifyContent: "space-between", }}>
                <Buttons type="submit" sx={{ marginTop: "15px", width: '100%', marginLeft: "auto" }} variant="contained" >
                  Agregar
                </Buttons>
              </Box>
            </Form>

          </Box>
        </Box>
      </Box>}

      {showModalDelete && <Box onClick={() => {
        setShowModalDelete(false);
      }} sx={{ zIndex: 10, paddingTop: 5, top: 0, left: 0, position: "fixed", width: "100%", height: "100%", backdropFilter: "blur(5px)", display: "flex", justifyContent: "center" }}>
        <Box sx={{ marginTop: 20, backgroundColor: "#00003d", border: "solid #432686ff 1px", borderRadius: "14px", height: '200px' }} onClick={(e) => e.stopPropagation()}>
          <Box sx={{ margin: '30px', width: '400px', height: '200px' }} >
            <Typography sx={{ marginY: 1, fontWeight: 'bold', color: "white", textAlign: "center", fontSize: 24 }}>
              ¿Estás Seguro?
            </Typography>
            <Typography sx={{ color: "white", textAlign: "center", marginY: 2}}>Vas a eliminar permanentemente esta divisa</Typography>
            <Box sx={{ minWidth: "290px", display: "flex", justifyContent: "space-between" }}>
              <Buttons onClick={() => { setShowModalDelete(false), setDeleteData(null)}} sx={{ marginTop: "5px", }} variant="contained">Cancelar</Buttons>
              <Buttons sx={{ marginTop: "5px", marginLeft: "auto", backgroundColor:'#c44040ff', '&:hover': {
                  backgroundColor: "#943131ff",
                  color:'white'},}} variant="contained" disabled={!status}
                onClick={async () => {
                  try {
                    const statusDelete = await fetchHook.delete(process.env.NEXT_PUBLIC_HOST_SERVICE + '/currency/' + deleteData)
                    if (statusDelete.statusCode != 200)
                      toast.error(statusDelete.message)
                      CurrencyHook.currencies
                      setStatus(true)
                      toast.success('Divisa Eliminada')
                      closeModal();
                      setDeleteData(null)
                  } catch (error) {
                    toast.error(error + "")
                    setStatus(true)
                  }
                }}>
                Confirmar
              </Buttons>
            </Box>
          </Box>
        </Box>
      </Box>}
    </Box>
  )
}
