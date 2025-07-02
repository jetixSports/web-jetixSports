"use client"
import React, { useState } from 'react'
import { UpdateUser } from '../types/updateUser'
import { useForm } from 'react-hook-form'
import Form from '../components/UX/Form/Form'
import Inputs from '../components/UX/Inputs/Inputs'
import { Box, Button, MenuItem, Select, Typography } from '@mui/material'
import Buttons from '../components/UX/Buttons/Buttons'
import toast from 'react-hot-toast'
import useFetch from '../hooks/useFetch'
import { useSession } from 'next-auth/react'

function useProfileImg() {
    const { data: session, update } = useSession();
    const { put } = useFetch()
    const [status, setStatus] = useState(true)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const fields = {
        file: register("file", { required: "No has subido ninguna imagen" }),
    }
    const onSubmit = async ({ file }: any) => {
        if (!status)
            return
        try {
            const formData = new FormData();
            formData.append("file", file[0])
            const updateUser = await put(process.env.NEXT_PUBLIC_HOST_SERVICE + '/users/changeImage', formData, true)
            if (updateUser.statusCode != 200)
                return toast.error(updateUser.message)
            toast.success(updateUser.message)
            update(updateUser.data)
            return
        } catch (error) {
            toast.error(error + "")
            setStatus(true)
        }
    }

    return {
        reactForm: <Form handleSubmit={handleSubmit(onSubmit)} >
            <Typography sx={{ marginY: 1, fontWeight: 'bold', color: "white", textAlign: "center", fontSize: 24 }}>
                Cambiar Foto de Perfil
            </Typography>
            <Typography sx={{ color: "white" }}>Nueva imagen</Typography>
            <Inputs
                type='file'
                sx={{ width: "100%", height: 36 }}
                {...fields.file}
                error={!!errors?.file}
                helperText={errors?.file?.message + ""}
            ></Inputs>

            <Box sx={{ minWidth: "290px", display: "flex", justifyContent: "space-between" }}>
                <Buttons type="submit" sx={{ marginTop: "5px", marginLeft: "auto" }} variant="contained">Guardar</Buttons>
            </Box>
        </Form>
    }
}

export default useProfileImg