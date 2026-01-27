'use client'
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Button,
  Input,
  Select,
  MenuItem,
} from '@mui/material';
import { CancelOutlined, Delete, Edit, } from '@mui/icons-material';
import useUserList from './useUserList';
import useUpdateUser from '../../hooks/useUpdateUser';
import { UsersInList } from './userList.types';
import Buttons from '../../components/UX/Buttons/Buttons';
import toast from 'react-hot-toast';
import useFetch from '../../hooks/useFetch';
import Inputs from '../../components/UX/Inputs/Inputs';
import Background from '../../components/UX/Background/Background';

export default function UserList() {
  const usersHook = useUserList()
  const fetchHook = useFetch()
  const [status, setStatus] = useState(true)
  const updateHook = useUpdateUser({sendRole:true})
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [deleteData, setDeleteData] = useState<UsersInList | null>(null)
  const [filter, setFilter] = useState(["Todos", ""])
  const selectValue = [
    ["firstName", "Nombre"], ["lastName", "Apellido"],
    ["email", "Correo"], ["username", "Nombre de usuario"]
  ]
  return (
    <Box sx={{  width: "100%",  display: 'flex',  alignItems: "center",  flexDirection: "column",  minHeight: "60vh", backgroundColor: "#04082a",  paddingTop: 10}}>
      <Background sx={{backgroundColor:'#050929ff'}}></Background>
      {deleteData && <Box onClick={() => setDeleteData(null)}
        sx={{ zIndex: 10, paddingY: 5, position: "fixed", width: "100%", height: "100%", backdropFilter: "blur(5px)", display: "flex", justifyContent: "center" }}>
        <Box>
          <Box sx={{
            maxWidth: "380px",
            minWidth: "210px",
            margin: 10,
            paddingX: { xs: 4, sm: 5 },
            paddingY: { xs: 2, sm: 3 },
            backgroundColor: "#00003d",
            border: "solid #432686ff 1px",
            borderRadius: "14px",
          }} onClick={(e) => e.stopPropagation()}>
            <Typography sx={{ marginY: 1, fontWeight: 'bold', color: "white", textAlign: "center", fontSize: 24 }}>
              ¿Estás Seguro?
            </Typography>
            <Typography sx={{ color: "white", textAlign: "center", marginY: 2}}>Vas a eliminar a "{deleteData.firstName} {deleteData.lastName}"</Typography>
            <Box sx={{ minWidth: "290px", display: "flex"}}>
              <Buttons onClick={() => setDeleteData(null)} sx={{ marginTop: "5px" }} variant="contained">Cancelar</Buttons>
              <Buttons sx={{ marginTop: "5px", marginLeft: "auto", backgroundColor:'#c44040ff', '&:hover': {
                  backgroundColor: "#943131ff",
                  color:'white'},}} variant="contained" disabled={!status}
                onClick={async () => {
                  try {
                    const statusDelete = await fetchHook.delete(process.env.NEXT_PUBLIC_HOST_SERVICE + '/users/' + deleteData._id)
                    if (statusDelete.statusCode != 200)
                      toast.error(statusDelete.message)
                    usersHook.findUsers()
                    setStatus(true)
                    setDeleteData(null)
                  } catch (error) {
                    toast.error(error + "")
                    setStatus(true)
                  }
                }}
              >Eliminar</Buttons>
            </Box>
          </Box>
        </Box>
      </Box>}
      {showModalEdit && <Box onClick={() => {
        usersHook.findUsers()
        setShowModalEdit(false)
      }} sx={{ zIndex: 10, paddingY:5 ,position: "fixed", width: "100%", height: "100%", backdropFilter: "blur(5px)", display: "flex", justifyContent: "center"  }}>
        <Box sx={{ marginTop: 2 }} onClick={(e) => e.stopPropagation()}>
          <Box sx={{ position: "relativo", width: "100%", display: 'flex', justifyContent: "end" }}>
            <Box sx={{ position: "absolute", margin: 4}}><CancelOutlined onClick={() => {
              usersHook.findUsers()
              setShowModalEdit(false)
            }} sx={{ color: "white", cursor: "pointer"}}></CancelOutlined> </Box>
          </Box>
          {updateHook.reactForm}
        </Box>
      </Box>}
      <Box sx={{width: "80%",  maxWidth: 900,marginTop:10, justifyContent:'center' }}>
        <TableContainer component={Paper} sx={{ maxWidth: 900, color: "white",  backgroundColor: "#20105b" }}>
          <Box sx={{ display: 'flex', margin: 1, flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ p: 2 }}>Lista de Usuarios</Typography>
            <Box sx={{ marginX: 1, display: 'flex', gap: 1, }}>
              <Select sx={{
                paddingX: "10px",
                marginY: "5px",
                backgroundColor: "#070744ff",
                borderRadius: "10px",
                color: "white",
                height: 36,
              }} defaultValue={"Todos"} onChange={(e) => setFilter([e.target.value, ''])}>
                <MenuItem value={'Todos'}>Todos</MenuItem>
                {selectValue.map((item, index) => {
                  return <MenuItem key={index} value={item[0]}>{item[1]}</MenuItem>
                })}
              </Select>
              <Inputs sx={filter[0] == "Todos" ? { opacity: 0.6 } : {}} style={{backgroundColor:'#070744ff'}} disabled={filter[0] == "Todos"} value={filter[1]} onChange={(e) => {
                const newValue = [filter[0], e.target.value]
                setFilter(newValue)
              }}></Inputs>
              <Buttons sx={{ color: "white", marginY: "5px" }} onClick={() => {
                if (filter[0] == "Todos") {
                  usersHook.setFilter({})
                } else {
                  usersHook.setFilter({ [filter[0]]: filter[1] })
                }
                usersHook.setPagination(1)
              }}>Filtrar</Buttons>
            </Box>
          </Box>
          <Table aria-label="Tabla de usuarios">
            <TableHead>
              <TableRow >
                <TableCell sx={{ color: "white", }}><strong>Nombre</strong></TableCell>
                <TableCell sx={{ color: "white", }}><strong>Email</strong></TableCell>
                <TableCell sx={{ color: "white", }}><strong>username</strong></TableCell>
                <TableCell sx={{ color: "white", }}><strong>Cuenta</strong></TableCell>
                <TableCell sx={{ color: "white", }}><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersHook.users?.map((user, i) => (
                <TableRow
                  key={i}
                  hover
                  sx={{ '&:last-child td': { borderBottom: 0 } }}
                >
                  <TableCell sx={{ color: "white" }}>{user.firstName} {user.lastName}</TableCell>
                  <TableCell sx={{ color: "white" }}>{user.email}</TableCell>
                  <TableCell sx={{ color: "white" }}>{user.username}</TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {user.role == "admin" ? "Administrador" :
                    user.role == "organizer" ? "Organizador" : "Regular"}
                  </TableCell>
                  <TableCell sx={{ color: "white", }}>
                    <IconButton onClick={() => {
                      updateHook.setIdUser(user._id)
                      updateHook.setUser(user)
                      setShowModalEdit(true)
                    }} aria-label="Editar" color="primary">
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="Eliminar" color="error"
                      onClick={() => setDeleteData(user)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {usersHook.users?.length == 0 && <TableRow
                hover
                sx={{ '&:last-child td': { borderBottom: 0 } }}
              >
                <TableCell sx={{ color: "white", }}>No se encontraron usuarios</TableCell></TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex' }}>
          <Button onClick={() => {
            if (usersHook.pagination > 1)
              usersHook.setPagination(usersHook.pagination - 1)
          }} >
            <Typography sx={{ color: "white", }}> {"<"}</Typography>
          </Button>
          <Input onChange={(e) => {
            if (+e.target.value < 1)
              e.target.value = '1'
            usersHook.setPagination(+e.target.value)
          }} type='number' minRows={1} disabled={!usersHook.status} sx={{ width: 50, color: "white" }} value={usersHook.pagination}></Input>
          <Button onClick={() => usersHook.setPagination(usersHook.pagination + 1)}>
            <Typography sx={{ color: "white", }}>{">"}</Typography>
          </Button>
        </Box>
      </Box>
    </Box >

  );
}