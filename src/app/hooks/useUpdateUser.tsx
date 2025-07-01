"use client"
import React, { useState } from 'react'
import { UpdateUser } from '../types/updateUser'
import { useForm } from 'react-hook-form'
import Form from '../components/UX/Form/Form'
import Inputs from '../components/UX/Inputs/Inputs'
import { Box, Button, MenuItem, Select, Typography } from '@mui/material'
import Buttons from '../components/UX/Buttons/Buttons'
import useFetch from './useFetch'
import toast from 'react-hot-toast'

function useUpdateUser({ defaultValues }: { defaultValues?: UpdateUser }) {
    const { post } = useFetch()
    const [user, setUser] = useState<UpdateUser | null>(null)
    const [idUser, setIdUser] = useState<string | null>(null)
    const [status, setStatus] = useState(true)
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues })
    const fields = {
        firstName: register("firstName", { required: "El nombre es requerido" }),
        lastName: register("lastName", { required: "El apellido es requerido" }),
        username: register("username", { required: "El nombre de usuario es requerido" }),
        role: register("role", { required: "El rol es requerido" }),
    }
    const onSubmit = async (updateData: UpdateUser) => {
        if (!status)
            return
        try {
            setStatus(false)
            const updateUser = await post(process.env.NEXT_PUBLIC_HOST_SERVICE + '/users/updateUser', { _id: idUser, ...updateData })
            setStatus(true)
            if (updateUser.statusCode != 200)
                return toast.error(updateUser.message)
            toast.success(updateUser.message)
        } catch (error) {
            toast.error(error + "")
            setStatus(true)
        }
    }
    return {
        user,
        setUser,
        setIdUser,
        reactForm: <Form handleSubmit={handleSubmit(onSubmit)} >
            <Typography sx={{ marginY: 1, fontWeight: 'bold', color: "white", textAlign: "center", fontSize: 24 }}>
                Editar Usuario
            </Typography>
            <Typography sx={{ color: "white" }}>Nombre</Typography>
            <Inputs
                value={user?.firstName}
                sx={{ width: "100%", height: 36 }}
                {...fields.firstName}
                onChange={(e) => {
                    fields.firstName.onChange(e)
                    if (!user)
                        return
                    const newObj = { ...user }
                    newObj.firstName = e.target.value
                    setUser(newObj)
                }}
                error={!!errors?.firstName}
                helperText={errors?.firstName?.message + ""}
            ></Inputs>
            <Typography sx={{ color: "white" }}>Apellido</Typography>
            <Inputs
                value={user?.lastName}
                sx={{ width: "100%", height: 36 }}
                {...fields.lastName}
                onChange={(e) => {
                    fields.lastName.onChange(e)
                    if (!user)
                        return
                    const newObj = { ...user }
                    newObj.lastName = e.target.value
                    setUser(newObj)
                }}
                error={!!errors?.lastName}
                helperText={errors?.lastName?.message + ""}
            ></Inputs>
            <Typography sx={{ color: "white" }}>Nombre de Usuario</Typography>
            <Inputs
                value={user?.username}
                sx={{ width: "100%", height: 36 }}
                {...fields.username}
                onChange={(e) => {
                    fields.username.onChange(e)
                    if (!user)
                        return
                    const newObj = { ...user }
                    newObj.username = e.target.value
                    setUser(newObj)
                }}
                error={!!errors?.username}
                helperText={errors?.username?.message + ""}
            ></Inputs>
            <Typography sx={{ color: "white" }}>Rol</Typography>
            <Select
                value={user?.role}
                sx={{
                    width: "100%",
                    paddingX: "10px",
                    marginY: "5px",
                    backgroundColor: "#20105B",
                    borderRadius: "10px",
                    color: "white",
                    height: 36,
                }}
                {...fields.role}
                onChange={(e) => {
                    fields.role.onChange(e)
                    if (!user)
                        return
                    const newObj = { ...user }
                    newObj.role = e.target.value
                    setUser(newObj)
                }}>
                <MenuItem value={"admin"}>Administrador</MenuItem>
                <MenuItem value={"user"}>Usuario</MenuItem>
                <MenuItem value={"organizer"}>Organizador</MenuItem>
            </Select>
            <Box sx={{ minWidth: "290px", display: "flex", justifyContent: "space-between" }}>
                <Buttons type="submit" sx={{ marginTop: "5px", marginLeft: "auto" }} variant="contained">Guardar</Buttons>
            </Box>
        </Form>
    }
}

export default useUpdateUser