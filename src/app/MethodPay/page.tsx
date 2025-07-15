/*Tener cuidado al mmodificar todos los archivos de la carpeta MethodPay, 
ni el desarrollador del codigo sabe que hizo aqui,
Solo sabe que medio funciona

importaciones importantes.
import useMethodAdd from "./useMethodAdd";
import useMethod from "./useMethod";
import useMethodEdit from "./useMethodEdit";
import useMethodOne from "./useMethodOne";
import useMethodDelete from "./useMethodDelete";

si se da;a algo se cae todo
*/

'use client'
import React, { SetStateAction, useEffect, useState } from "react";
import {Table, TableBody,TableCell, TableContainer,TableHead, TableRow, Paper, IconButton, Button,
  Box, Typography, Pagination, Stack,
  Alert,
  Select,
  MenuItem,
  InputLabel} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { CancelOutlined } from "@mui/icons-material";
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import Form from "../components/UX/Form/Form";
import Inputs from "../components/UX/Inputs/Inputs";
import Buttons from "../components/UX/Buttons/Buttons";
import useMethodAdd from "./useMethodAdd";
import useMethod from "./useMethod";
import useMethodEdit from "./useMethodEdit";
import useMethodOne from "./useMethodOne";
import useMethodDelete from "./useMethodDelete";

export default function TablaMetodosPago() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  //Para a;adir
  const { handleSubmitAdd, fields, errors, 
    handlePaymentTypeChange,paymentType, register, reset} = useMethodAdd();
   //Para buscar todos
  const { methods, loading, error, refresh} = useMethod();
  const params = useParams();
  const paymentMethodId = params.id as string;
  //Para buscar 1 por id
  const { method, setMethodId} = useMethodOne();
  //Para Eliminar
    const { 
    methodId,
    setMethodIdDelet,
    handleDeleteMethod, 
    isSubmitting 
  } = useMethodDelete(paymentMethodId);

  //Para editar
  const {
    handleSubmitEdit,
    errorss,
    fieldss,
    handlePaymentTypeChangeEdit,
    isSubmittingEdit,
    paymentTypeEdit,
    selectedMethodEdit,
    loadMethodData,
    resetForm,
  } = useMethodEdit();

  useEffect(() => {
    setMethodId(paymentMethodId);
  }, [paymentMethodId]);

  useEffect(() => {
    if (paymentMethodId) {
      loadMethodData(paymentMethodId);
    }
  }, [paymentMethodId]);
  
  const paginatedMethods = methods.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage - 1);
  };

  console.log('metodo de pago en page.tsx ',method);
  const [methodIdToDelete, setMethodIdToDelete] = useState<string | null>(null);

  const handleEditClick = (methodId: string) => {
  setSelectedMethod(methodId);
  setMethodId(methodId); 
  setShowModalEdit(true);
};
  const handleDeleteClick = (methodId: string) => {
    setMethodIdToDelete(methodId);
    setShowModalDelete(true);
  };

  const handleDeleteMethodh = async () => {
    if (!methodIdToDelete) return;
    
    try {
      const success = await handleDeleteMethod(methodIdToDelete);
      if (success) {
        await refresh();
        closeModal();
      }
    } catch (error) {
      toast.error('Error al eliminar el método');
    }
  };

  const closeModal = () => {
    setShowModalDelete(false);
    setMethodIdToDelete(null);
  };
  return (
    <Box sx={{  width: "100%",  display: 'flex',  alignItems: "center",  flexDirection: "column",  minHeight: "84.1vh", backgroundColor: "#00003D",  paddingTop: 15}}>
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
                ) : methods && methods.length > 0 ? (
                  paginatedMethods.map((method) => (
                    <TableRow key={method._id} hover>
                      
                      <TableCell sx={{ color: 'white' }}>{method.typePay === 'mobile_payment' 
                        ? 'Pago Móvil' 
                        : method.typePay === 'bank_transfer' 
                          ? 'Transferencia Bancaria' 
                          : method.typePay === 'binance' 
                            ? 'Binance' 
                            : method.typePay}
                      </TableCell>
                      <TableCell sx={{ color: 'white' }}>
                        {method.typePay === 'binance' && (
                          <> <strong>Email:</strong> {method.details.email} </>
                        )}
                        {method.typePay === 'mobile_payment' && (
                          <>
                            <Box><strong>Código banco:</strong> {method.details.mobileCode}</Box>
                            <Box><strong>Cédula:</strong> {method.details.identity}</Box>
                            <Box><strong>Teléfono:</strong> {method.details.phoneNumber}</Box>
                          </>
                        )}
                        {method.typePay === 'bank_transfer' && (
                          <>
                            <Box><strong>Número de cuenta:</strong> {method.details.bankNumber}</Box>
                            <Box><strong>Cédula:</strong> {method.details.identity}</Box>
                          </>
                        )}
                      </TableCell>
                      <TableCell sx={{ color: 'white' }}>
                        <IconButton onClick={() => handleEditClick(method._id)}   aria-label="editar" color="primary">
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell sx={{ color: 'white' }}>
                        <IconButton onClick={() => handleDeleteClick(method._id) } aria-label="eliminar" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ color: 'white', textAlign: 'center' }}>
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
                  count={Math.ceil(methods.length / rowsPerPage)}
                  page={page + 1}
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

      {showModalAdd && <Box onClick={() => { setShowModalAdd(false); reset();
         }} sx={{ zIndex: 10, paddingTop: 5, top: 0, left: 0, position: "fixed", width: "100%", height: "100%", backdropFilter: "blur(5px)", display: "flex", "justifyContent": "center" }}>
         <Box sx={{ marginTop:12 }} onClick={(e) => e.stopPropagation()}>
           <Box sx={{ position: "relativo", width: "100%", display: 'flex', justifyContent: "end" }}>
              <Box sx={{ position: "absolute", margin: 4 }}>
                <CancelOutlined onClick={() => {
                  setShowModalAdd(false); reset(); }} sx={{ color: "white", cursor: "pointer" }}>
                </CancelOutlined> 
              </Box>
            </Box>
            <Form handleSubmit={handleSubmitAdd}  >
              <Typography sx={{  marginY: 1,  fontWeight: "bold", color: "white", textAlign: "center", fontSize: 24, }} >
                    Agregar Metodo de Pago
              </Typography>
              <Stack spacing={{ xs: 3, sm: 2 }} useFlexGap>
                <InputLabel id="payment-method-label" sx={{color:'white'}}>Método de pago</InputLabel>
                <Select
                  labelId="payment-method-label"
                   id="payment-method-select"
                   value={paymentType || ''}
                   label="Método de pago"
                    onChange={handlePaymentTypeChange}
                    sx={{width: "100%", paddingX: "10px", marginY: "5px", backgroundColor: "#20105B", borderRadius: "10px",color: "white", height: 36,  }}
                    >
                    <MenuItem value="mobile_payment">
                        <Box sx={{ display: 'flex', alignItems: 'center'}}>
                            <Typography>Pago Móvil</Typography>
                        </Box>
                    </MenuItem>
                    <MenuItem value="bank_transfer">
                        <Box sx={{ display: 'flex', alignItems: 'center'}}>
                            <Typography>Transferencia Bancaria</Typography>
                        </Box>
                    </MenuItem>
                    <MenuItem value="binance">
                        <Box sx={{ display: 'flex', alignItems: 'center'}}>
                            <Typography>Binance</Typography>
                        </Box>
                    </MenuItem>
                </Select>

                     {paymentType === 'mobile_payment' && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', color:'white'}}>
                                <Typography sx={{ color: "white" }}>Codigo del Banco</Typography>
                                <Inputs
                                    type="number"
                                    placeholder="Ej. 0102"
                                    sx={{ width: "100%", height: 36}}
                                    {...register('details.mobileCode')}
                                    {...fields.details.mobileCode}
                                    error={!!errors?.details?.mobileCode}
                                    helperText={errors?.details?.mobileCode?.message + ""}
                                />

                                <Typography sx={{ color: "white" }}>Cedula</Typography>
                                <Inputs
                                    type="number"
                                    placeholder="Ej. 12345678"
                                    sx={{ width: "100%", height: 36 }}
                                    {...register('details.identity')}
                                    {...fields.details}
                                    error={!!errors?.details?.identity}
                                    helperText={errors?.details?.identity?.message + ""}
                                />
                                <Typography sx={{ color: "white" }}>Telefono</Typography>
                                <Inputs
                                  {...register('details.phoneNumber')}
                                    type="number"
                                    placeholder="Ej. 04261234568"
                                    sx={{ width: "100%", height: 36 }}
                                    {...fields.details}
                                    error={!!errors?.details?.phoneNumber}
                                    helperText={errors?.details?.phoneNumber?.message + ""}
                                />
                            </Box>
                    )}
                    {paymentType === 'bank_transfer' && (
                             <Box sx={{ display: 'flex', flexDirection: 'column', color:'white'}}>
                                <Typography sx={{ color: "white" }}>Numero de Cuenta</Typography>
                                <Inputs
                                    type="number"
                                    placeholder="Ej. 12345678901234567890"
                                    sx={{ width: "100%", height: 36}}
                                    {...register('details.bankNumber')}
                                    {...fields.details.bankNumber}
                                    error={!!errors?.details?.bankNumber}
                                    helperText={errors?.details?.bankNumber?.message + ""}
                                />

                                <Typography sx={{ color: "white" }}>Cedula</Typography>
                                <Inputs
                                    type="number"
                                    placeholder="Ej. 12345678"
                                    sx={{ width: "100%", height: 36 }}
                                    {...register('details.identity')}
                                    {...fields.details.identity}
                                    error={!!errors?.details?.identity}
                                    helperText={errors?.details?.identity?.message + ""}
                                />
                                <Typography sx={{ color: "white" }}>Telefono</Typography>
                                <Inputs
                                    type="number"
                                    placeholder="Ej. 04261234568"
                                    sx={{ width: "100%", height: 36 }}
                                    {...register('details.phoneNumber')}
                                    {...fields.details.phoneNumber}
                                    error={!!errors?.details?.phoneNumber}
                                    helperText={errors?.details?.phoneNumber?.message + ""}
                                />
                            </Box>
                    )}
                        {paymentType === 'binance' && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', color:'white'}}>
                                <Typography sx={{ color: "white" }}>Correo Electronico</Typography>
                                <Inputs
                                    placeholder="Ej. ejemplo@gmail.com"
                                    sx={{ width: "100%", height: 36}}
                                    {...register('details.email')}
                                    {...fields.details.email}
                                    error={!!errors?.details?.email}
                                    helperText={errors?.details?.email?.message + ""}
                                />
                            </Box>
                    )}
              </Stack>
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
         <Box sx={{ marginTop:12 }} onClick={(e) => e.stopPropagation()}>
           <Box sx={{ position: "relativo", width: "100%", display: 'flex', justifyContent: "end" }}>
              <Box sx={{ position: "absolute", margin: 4 }}>
                <CancelOutlined onClick={() => {
                  setShowModalEdit(false) }} sx={{ color: "white", cursor: "pointer" }}>
                </CancelOutlined> 
              </Box>
            </Box>
            <Form handleSubmit={handleSubmitEdit}>
                <Typography sx={{ marginY: 1, fontWeight: "bold", color: "white", textAlign: "center", fontSize: 24 }}>
                  Editar Metodo de Pago
                </Typography>
                <Typography sx={{ color: "white", fontWeight: "bold" }}>Metodo de Pago:</Typography>
                {method && (
                  <>
                    <Typography sx={{ color: "white" }}>{method?.typePay}</Typography>

                    {method?.typePay === 'mobile_payment' && (
                      <Box sx={{ display: 'flex', flexDirection: 'column', color: 'white' }}>
                        <Typography sx={{ color: "white" }}>Codigo del Banco</Typography>
                        <Inputs
                          type="number"
                          defaultValue={method?.details?.mobileCode || ''}
                          sx={{ width: "100%", height: 36 }}
                          {...register('details.mobileCode')}
                          {...fieldss.details.mobileCode}
                          error={!!errorss?.details?.mobileCode}
                          helperText={errorss?.details?.mobileCode?.message + ""}
                        />

                        <Typography sx={{ color: "white" }}>Cedula</Typography>
                        <Inputs
                          type="number"
                          defaultValue={method.details?.identity || ''}
                          sx={{ width: "100%", height: 36 }}
                          {...register('details.identity')}
                          {...fieldss.details.identity}
                          error={!!errorss?.details?.identity}
                          helperText={errorss?.details?.identity?.message + ""}
                        />

                        <Typography sx={{ color: "white" }}>Telefono</Typography>
                        <Inputs
                          type="number"
                          defaultValue={method.details?.phoneNumber || ''}
                          sx={{ width: "100%", height: 36 }}
                          {...register('details.phoneNumber')}
                          {...fieldss.details.phoneNumber}
                          error={!!errorss?.details?.phoneNumber}
                          helperText={errorss?.details?.phoneNumber?.message + ""}
                        />
                      </Box>
                    )}

                    {method?.typePay === 'bank_transfer' && (
                      <Box sx={{ display: 'flex', flexDirection: 'column', color: 'white' }}>
                        <Typography sx={{ color: "white" }}>Numero de Cuenta</Typography>
                        <Inputs
                          type="number"
                          defaultValue={method.details?.bankNumber || ''}
                          sx={{ width: "100%", height: 36 }}
                          {...register('details.bankNumber')}
                          {...fieldss.details.bankNumber}
                          error={!!errorss?.details?.bankNumber}
                          helperText={errorss?.details?.bankNumber?.message + ""}
                        />

                        <Typography sx={{ color: "white" }}>Cedula</Typography>
                        <Inputs
                          type="number"
                          defaultValue={method.details?.identity || ''}
                          sx={{ width: "100%", height: 36 }}
                          {...register('details.identity')}
                          {...fieldss.details.identity}
                          error={!!errorss?.details?.identity}
                          helperText={errorss?.details?.identity?.message + ""}
                        />

                        <Typography sx={{ color: "white" }}>Telefono</Typography>
                        <Inputs
                          type="number"
                          defaultValue={method.details?.phoneNumber || ''}
                          sx={{ width: "100%", height: 36 }}
                          {...register('details.phoneNumber')}
                          {...fieldss.details.phoneNumber}
                          error={!!errorss?.details?.phoneNumber}
                          helperText={errorss?.details?.phoneNumber?.message + ""}
                        />
                      </Box>
                    )}

                    {method?.typePay === 'binance' && (
                      <Box sx={{ display: 'flex', flexDirection: 'column', color: 'white' }}>
                        <Typography sx={{ color: "white" }}>Correo Electronico</Typography>
                        <Inputs
                          defaultValue={method.details?.email || ''}
                          sx={{ width: "100%", height: 36 }}
                          {...register('details.email')}
                          {...fieldss.details.email}
                          error={!!errorss?.details?.email}
                          helperText={errorss?.details?.email?.message + ""}
                        />
                      </Box>
                    )}
                  </>
                )}

                <Box sx={{ minWidth: "290px", display: "flex", justifyContent: "space-between" }}>
                  <Buttons type="submit" sx={{ marginTop: "5px", marginLeft: "auto" }} variant="contained">
                    Guardar Cambios
                  </Buttons>
                </Box>
              </Form>
        </Box>
      </Box>}

      {showModalDelete && <Box onClick={() => { setShowModalDelete(false); 
         }} sx={{ zIndex: 10, paddingTop: 5, top: 0, left: 0, position: "fixed", width: "100%", height: "100%", backdropFilter: "blur(5px)", display: "flex", "justifyContent": "center"}}>
         <Box sx={{ marginTop:30,backgroundColor:'#00003d',height:'200px', display:'flex', justifyContent:'center', flexDirection:'column' }} onClick={(e) => e.stopPropagation()}>
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
                    <Buttons type="submit" onClick={handleDeleteMethodh} sx={{ marginTop: "15px",width:'100%', marginLeft: "auto" ,backgroundColor:'red'}} variant="contained" >
                        Confirmar Eliminación
                    </Buttons>
                </Box>
            </Box>
        </Box>
      </Box>}
    </Box>
  );
}