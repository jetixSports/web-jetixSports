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
import { Cancel, CancelOutlined, CancelScheduleSend, CancelTwoTone, CheckCircleOutline, CheckOutlined, Delete, Edit, } from '@mui/icons-material';
import Buttons from '../../components/UX/Buttons/Buttons';
import toast, { CheckmarkIcon } from 'react-hot-toast';
import useFetch from '../../hooks/useFetch';
import Background from '../../components/UX/Background/Background';
import useInvitations from './useInvitations';

export default function Invitations() {
    const [invitationData,setInvitationData]=useState<{accepted:boolean,_idInvitation:string,teamName:string}|null>(null)
    const invitationsHook = useInvitations({dialogData:invitationData,setDialogData:setInvitationData})
    const [filter, setFilter] = useState({ status: '' })
    const allStatus: { [key: string]: string } = {
        pending: 'Pendiente',
        accepted: 'Aceptada',
        denied: 'Rechazada'
    }
    return (
        <Box sx={{ width: "100%", "display": 'flex', "alignItems": "center", flexDirection: "column", minHeight: "84.1vh" }}>
            <Background src="/backgrounds/login.svg"></Background>
            {invitationsHook.ReactDialog}
            <Box sx={{ marginTop: 15, marginX: 2, marginBottom: 2 }}>
                <TableContainer component={Paper} sx={{ maxWidth: 900, color: "white", backgroundColor: "#00003D" }}>
                    <Box sx={{ display: 'flex', margin: 1, flexDirection: 'column' }}>
                        <Typography variant="h6" sx={{ p: 2 }}>Lista de Invitaciones</Typography>
                        <Typography sx={{ paddingX: 1 }}>Buscar por Equipo:</Typography>
                        <Box sx={{ marginX: 1, display: 'flex', gap: 1, }}>
                            <Select sx={{
                                paddingX: "10px",
                                marginY: "5px",
                                backgroundColor: "#20105B",
                                borderRadius: "10px",
                                color: "white",
                                width:'100%',
                                height: 36,
                            }} defaultValue={"Todos"} onChange={(e) => setFilter({status:e.target.value})}>
                                <MenuItem value={'Todos'}>Todos</MenuItem>
                                {Object.entries(allStatus).map(([key, value], index) => {
                                    return <MenuItem key={index} value={key}>{value}</MenuItem>
                                })}
                            </Select>
                            <Buttons sx={{ color: "white", marginY: "5px" }} onClick={() => {
                                invitationsHook.setFilter(filter)
                            }}>Filtrar</Buttons>
                        </Box>
                    </Box>
                    <Table aria-label="Tabla de usuarios">
                        <TableHead>
                            <TableRow >
                                <TableCell sx={{ color: "white", }}><strong>Equipo</strong></TableCell>
                                <TableCell sx={{ color: "white", }}><strong>Invitador</strong></TableCell>
                                <TableCell sx={{ color: "white", }}><strong>Estatus</strong></TableCell>
                                <TableCell sx={{ color: "white", }}><strong>Acciones</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invitationsHook.invitations?.map((invitation, i) => {
                                const user = invitationsHook.users?.find(u => u._id == invitation.invitorId)
                                const teamName=invitationsHook.teams?.find(t => t._id == invitation.teamId)?.name??''
                                return (
                                    <TableRow
                                        key={i}
                                        hover
                                        sx={{ '&:last-child td': { borderBottom: 0 } }}
                                    >
                                        <TableCell sx={{ color: "white", }}>{teamName}</TableCell>
                                        <TableCell sx={{ color: "white", }}>{user?.firstName} {user?.lastName}</TableCell>
                                        <TableCell sx={{ color: "white", }}>{allStatus[invitation.status] ?? ''}</TableCell>
                                        <TableCell sx={{ color: "white", }}>
                                            <IconButton disabled={invitation.status!='pending'} onClick={() => {setInvitationData({_idInvitation:invitation._id,accepted:true,teamName})}} aria-label="Editar" color="success">
                                                <CheckOutlined />
                                            </IconButton>
                                            <IconButton disabled={invitation.status!='pending'}  aria-label="Eliminar" color="error"
                                                onClick={() => { setInvitationData({_idInvitation:invitation._id,accepted:false,teamName})}}>
                                                <CancelOutlined fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                            {invitationsHook.invitations?.length == 0 && <TableRow
                                hover
                                sx={{ '&:last-child td': { borderBottom: 0 } }}
                            >
                                <TableCell sx={{ color: "white", }}>No se encontro ninguna invitación</TableCell></TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box >

    );
}