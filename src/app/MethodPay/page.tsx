'use client'
import React, { useState } from "react";
import {Table, TableBody,TableCell, TableContainer,TableHead, TableRow, Paper, IconButton, Button,
  Box, Typography, Pagination, Stack} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Background from "../components/UX/Background/Background";
import { CancelOutlined } from "@mui/icons-material";

import Form from "../components/UX/Form/Form";
import Inputs from "../components/UX/Inputs/Inputs";
import Buttons from "../components/UX/Buttons/Buttons";
import useMethodPay from "./useMethodPay";

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
  const [showModalCreate, setShowModalCreate] = useState(false)
  const {handleSubmit} = useMethodPay();
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

  const handleAdd = () => {
    const newId = rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1;
    const newRow = {
      id: newId,
      metodoPago: `Nuevo Método ${newId}`,
      detalles: "Detalles del nuevo método",
    };
    setRows([...rows, newRow]);
    // Ir a la última página si agregamos un elemento que excede la página actual
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
        <Button variant="contained"  color="success" startIcon={<AddCircleIcon />} onClick={handleAdd} sx={{ mb: 2 }}>
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
                      <IconButton aria-label="editar" color="primary">
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      <IconButton
                        aria-label="eliminar"
                        color="error"
                        onClick={() => handleDelete(row.id)}
                      >
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

      {showModalCreate && <Box onClick={() => { setShowModalCreate(false)
         }} sx={{ zIndex: 10, paddingTop: 5, top: 0, left: 0, position: "fixed", width: "100%", height: "100%", backdropFilter: "blur(5px)", display: "flex", "justifyContent": "center" }}>
         <Box sx={{ marginTop: 10 }} onClick={(e) => e.stopPropagation()}>
           <Box sx={{ position: "relativo", width: "100%", display: 'flex', justifyContent: "end" }}>
              <Box sx={{ position: "absolute", margin: 4 }}>
                <CancelOutlined onClick={() => {
                  setShowModalCreate(false) }} sx={{ color: "white", cursor: "pointer" }}>
                </CancelOutlined> 
              </Box>
            </Box>
            <Form handleSubmit={}>
                <Typography sx={{  marginY: 1,  fontWeight: "bold", color: "white", textAlign: "center", fontSize: 24, }} >
                    Crear un Equipo
                </Typography>
                <Typography sx={{ color: "white" }}>Nombre del equipo</Typography>

                <Inputs sx={{ width: "100%", height: 36 }}
                    {...fields.name}
                    error={!!errors?.name}
                    helperText={errors?.name?.message + ""}
                />

                <Typography sx={{ color: "white" }}>Descripción del equipo</Typography>
                <Inputs
                    sx={{ width: "100%", height: 36 }}
                    {...fields.description}
                    error={!!errors?.description}
                    helperText={errors?.description?.message + ""}
                />
                <Typography sx={{ color: "white" }}>Foto del equipo</Typography>
                <Inputs
                    type="file"
                    sx={{ width: "100%", height: 36 }}
                    {...fields.file}
                    error={!!errors?.file}
                    helperText={errors?.file?.message + ""}
                />
            <Box
                    sx={{
                        minWidth: "290px",
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                    <Buttons
                        type="submit"
                        sx={{ marginTop: "5px", marginLeft: "auto" }}
                        variant="contained"
                    >
                    Guardar
                    </Buttons>
                </Box>
            </Form>
        </Box>
      </Box>}

    </Box>
  );
}