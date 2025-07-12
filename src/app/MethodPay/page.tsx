'use client'
import React, { useState } from "react";
import {Table, TableBody,TableCell, TableContainer,TableHead, TableRow, Paper, IconButton, Button,
  Box, Typography, Pagination, Stack,
  Alert} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Background from "../components/UX/Background/Background";
import { CancelOutlined } from "@mui/icons-material";
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

import Form from "../components/UX/Form/Form";
import Inputs from "../components/UX/Inputs/Inputs";
import Buttons from "../components/UX/Buttons/Buttons";
import useMethodPay from "./useMethodAdd";

interface MetodoPago {
  id: number;
  metodoPago: string;
  detalles: string;
}

const initialRows: MetodoPago[] = [
  { id: 1, metodoPago: "Tarjeta de Crédito", detalles: "Visa **** 4242" },
  { id: 2, metodoPago: "PayPal", detalles: "usuario@example.com" },
  { id: 3, metodoPago: "Transferencia Bancaria", detalles: "Banco XYZ - Cuenta 123456" },
  { id: 4, metodoPago: "Efectivo", detalles: "Pago en local" },
  { id: 5, metodoPago: "Bitcoin", detalles: "Wallet 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" },
  { id: 6, metodoPago: "Débito", detalles: "Mastercard **** 5555" },
  { id: 7, metodoPago: "Apple Pay", detalles: "iPhone 1234" },
  { id: 8, metodoPago: "Google Pay", detalles: "Cuenta Gmail" },
  { id: 9, metodoPago: "Transferencia", detalles: "Banco ABC - Cuenta 987654" },
];

export default function TablaMetodosPago() {
  const [rows, setRows] = useState<MetodoPago[]>(initialRows);
  const [page, setPage] = useState(1);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const {handleSubmit, fields,errors} = useMethodPay();
  const itemsPerPage = 4;

  // Calcular total de páginas
  const pageCount = Math.ceil(rows.length / itemsPerPage);
  
  // Obtener datos para la página actual
  const currentItems = rows.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleDelete = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
    // Si la página actual queda vacía después de eliminar, retroceder una página
    if (currentItems.length === 1 && page > 1) {
      setPage(page - 1);
    }
  };

  const handleSubmitAdd = () => {
    const newId = rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1;
    const newRow = {
      id: newId,
      metodoPago: `Nuevo Método ${newId}`,
      detalles: "Detalles del nuevo método",
    };
    setRows([...rows, newRow]);
    if (currentItems.length >= itemsPerPage) {
      setPage(pageCount + 1);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box sx={{  width: "100%",  display: 'flex',  alignItems: "center",  flexDirection: "column",  minHeight: "84.1vh", backgroundColor: "#00003D",  paddingTop: 15}}>
      <Background src="/backgrounds/login.svg" />
      <Box sx={{ width: "80%",  maxWidth: 900, marginBottom: 2 }}>
        <Button onClick={() => setShowModalAdd(true)} variant="contained"  color="success" startIcon={<AddCircleIcon />} sx={{ mb: 2 }}>
          Agregar Método de Pago
        </Button>
      </Box>

      <Box sx={{  width: "80%",  maxWidth: 900, marginBottom: 4}}>
        <TableContainer component={Paper} sx={{ backgroundColor: "#20105b" }}>
          <Typography variant="h6" sx={{ p: 2, color: "white" }}>Métodos de Pago</Typography>
          <Table aria-label="Tabla de métodos de pago">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "white" }}><strong>Método de Pago</strong></TableCell>
                <TableCell sx={{ color: "white" }}><strong>Detalles</strong></TableCell>
                <TableCell sx={{ color: "white" }}><strong>Editar</strong></TableCell>
                <TableCell sx={{ color: "white" }}><strong>Eliminar</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.length > 0 ? (
                currentItems.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell sx={{ color: "white" }}>{row.metodoPago}</TableCell>
                    <TableCell sx={{ color: "white" }}>{row.detalles}</TableCell>
                    <TableCell sx={{ color: "white" }}>
                      <IconButton onClick={() => setShowModalEdit(true)} aria-label="editar" color="primary">
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      <IconButton  aria-label="eliminar" color="error" onClick={() => setShowModalDelete(true)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} sx={{ color: "white", textAlign: "center" }}>
                    No hay métodos de pago registrados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginación */}
        <Stack spacing={2} sx={{ mt: 2, alignItems: "center" }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color="secondary"
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'white'
              },
              '& .Mui-selected': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)'
              }
            }}
          />
        </Stack>
      </Box>

      {showModalAdd && <Box onClick={() => { setShowModalAdd(false)
         }} sx={{ zIndex: 10, paddingTop: 5, top: 0, left: 0, position: "fixed", width: "100%", height: "100%", backdropFilter: "blur(5px)", display: "flex", "justifyContent": "center" }}>
         <Box sx={{ marginTop:15 }} onClick={(e) => e.stopPropagation()}>
           <Box sx={{ position: "relativo", width: "100%", display: 'flex', justifyContent: "end" }}>
              <Box sx={{ position: "absolute", margin: 4 }}>
                <CancelOutlined onClick={() => {
                  setShowModalAdd(false) }} sx={{ color: "white", cursor: "pointer" }}>
                </CancelOutlined> 
              </Box>
            </Box>
            <Form handleSubmit={handleSubmitAdd}>
                <Typography sx={{  marginY: 1,  fontWeight: "bold", color: "white", textAlign: "center", fontSize: 24, }} >
                    Agregar Metodo de Pago
                </Typography>
                <Typography sx={{ color: "white" }}>Tipo de Metodo</Typography>
                <Inputs sx={{ width: "100%", height: 36 }}
                    {...fields.typePay}
                    error={!!errors?.typePay}
                    helperText={errors?.typePay?.message + ""}
                />

                <Typography sx={{ color: "white" }}>Detalles</Typography>
                <Inputs
                    sx={{ width: "100%", height: 36 }}
                    {...fields.Details}
                    error={!!errors?.Details}
                    helperText={errors?.Details?.message + ""}
                />
                <Box sx={{ minWidth: "290px",  display: "flex", justifyContent: "space-between", }}>
                    <Buttons type="submit"  sx={{ marginTop: "5px", marginLeft: "auto" }} variant="contained" >
                        Guardar
                    </Buttons>
                </Box>
            </Form>
        </Box>
      </Box>}

      {showModalEdit && <Box onClick={() => { setShowModalEdit(false)
         }} sx={{ zIndex: 10, paddingTop: 5, top: 0, left: 0, position: "fixed", width: "100%", height: "100%", backdropFilter: "blur(5px)", display: "flex", "justifyContent": "center" }}>
         <Box sx={{ marginTop:15 }} onClick={(e) => e.stopPropagation()}>
           <Box sx={{ position: "relativo", width: "100%", display: 'flex', justifyContent: "end" }}>
              <Box sx={{ position: "absolute", margin: 4 }}>
                <CancelOutlined onClick={() => {
                  setShowModalEdit(false) }} sx={{ color: "white", cursor: "pointer" }}>
                </CancelOutlined> 
              </Box>
            </Box>
            <Form handleSubmit={handleSubmit}>
                <Typography sx={{  marginY: 1,  fontWeight: "bold", color: "white", textAlign: "center", fontSize: 24, }} >
                    Editar Metodo de Pago
                </Typography>
                <Typography sx={{ color: "white" }}>Tipo de Metodo</Typography>
                <Inputs sx={{ width: "100%", height: 36 }}
                    placeholder=""
                    {...fields.typePay}
                    error={!!errors?.typePay}
                    helperText={errors?.typePay?.message + ""}
                />

                <Typography sx={{ color: "white" }}>Detalles</Typography>
                <Inputs
                    placeholder=""
                    sx={{ width: "100%", height: 36 }}
                    {...fields.Details}
                    error={!!errors?.Details}
                    helperText={errors?.Details?.message + ""}
                />
                <Box sx={{ minWidth: "290px",  display: "flex", justifyContent: "space-between", }}>
                    <Buttons type="submit"  sx={{ marginTop: "5px", marginLeft: "auto" }} variant="contained" >
                        Editar
                    </Buttons>
                </Box>
            </Form>
        </Box>
      </Box>}

      {showModalDelete && <Box onClick={() => { setShowModalDelete(false)
         }} sx={{ zIndex: 10, paddingTop: 5, top: 0, left: 0, position: "fixed", width: "100%", height: "100%", backdropFilter: "blur(5px)", display: "flex", "justifyContent": "center"}}>
         <Box sx={{ marginTop:'180px',backgroundColor:'#00003d',height:'200px', display:'flex', justifyContent:'center', flexDirection:'column' }} onClick={(e) => e.stopPropagation()}>
           <Box sx={{ position: "relativo", width: "100%", display: 'flex', justifyContent: "end", backgroundColor:'#00003d', marginBottom:'10px' }}>
              <Box sx={{ position: "absolute", margin: 3 }}>
                <CancelOutlined onClick={() => {
                  setShowModalDelete(false) }} sx={{ color: "white", cursor: "pointer" }}>
                </CancelOutlined> 
              </Box>
            </Box>
            <Box sx={{margin:'30px', width:'400px',height:'200px'}} >
                <Alert  sx={{marginTop:'15px', fontSize:'20px'}} severity="warning" icon={<WarningRoundedIcon />}>
                   Confirma que deseas eliminar este metodo de pago?
                </Alert>
                <Box sx={{ minWidth: "290px",  display: "flex", justifyContent: "space-between", }}>
                    <Buttons type="submit"  sx={{ marginTop: "15px",width:'100%', marginLeft: "auto" ,backgroundColor:'red'}} variant="contained" >
                        Confirmar
                    </Buttons>
                </Box>
            </Box>
        </Box>
      </Box>}
    </Box>
  );
}