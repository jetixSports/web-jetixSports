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
  Checkbox,
  IconButton,
  Typography,
  Box,
  Button,
  Input,
  Select,
  MenuItem,
} from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import useUserList from './useUserList';

export default function UserList() {
  const usersHook = useUserList()
  const [filter,setFilter]=useState(["Todos",""])
  const selectValue = [
    ["firstName", "Nombre"], ["lastName", "Apellido"],
    ["email", "Correo"], ["username", "Nombre de usuario"]
  ]
  return (
    <Box>
      <TableContainer component={Paper} sx={{ maxWidth: 900, marginTop: 10, marginX: 2 }}>
        <Box sx={{ display: 'flex' }}>
          <Typography variant="h6" sx={{ p: 2 }}>Lista de Usuarios</Typography>
          <Box sx={{marginLeft:'auto'}}>
            <Select defaultValue={"Todos"} onChange={(e)=>setFilter([e.target.value,''])}>
              <MenuItem  value={'Todos'}>Todos</MenuItem>
              {selectValue.map((item,index)=>{
                return <MenuItem key={index} value={item[0]}>{item[1]}</MenuItem>
              })}
              </Select>
              <Input disabled={filter[0]=="Todos"} value={filter[1]} onChange={(e)=>{
                const newValue=[filter[0],e.target.value]
                setFilter(newValue)
              }}></Input>
              <Button onClick={()=>{
                if(filter[0]=="Todos"){
                  usersHook.setFilter({})
                }else{
                  usersHook.setFilter({[filter[0]]:filter[1]})
                }
                usersHook.setPagination(1)
              }}><Typography>Filtrar</Typography></Button>
          </Box>
        </Box>
        <Table aria-label="Tabla de usuarios">
          <TableHead>
            <TableRow>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>username</strong></TableCell>
              <TableCell><strong>Rol</strong></TableCell>
              <TableCell><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersHook.users?.map((user, i) => (
              <TableRow
                key={i}
                hover
                sx={{ '&:last-child td': { borderBottom: 0 } }}
              >
                <TableCell>{user.firstName} {user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <IconButton aria-label="Editar" color="primary">
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton aria-label="Eliminar" color="error">
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex' }}>
        <Button onClick={() => {
          if (usersHook.pagination > 1)
            usersHook.setPagination(usersHook.pagination - 1)
        }} >
          <Typography>{"<"}</Typography>
        </Button>
        <Input onChange={(e) => {
          if (+e.target.value < 1)
            e.target.value = '1'
          usersHook.setPagination(+e.target.value)
        }} type='number' minRows={1} disabled={!usersHook.status} sx={{ width: 50 }} value={usersHook.pagination}></Input>
        <Button onClick={() => usersHook.setPagination(usersHook.pagination + 1)}>
          <Typography>{">"}</Typography>
        </Button>
      </Box>
    </Box>

  );
}