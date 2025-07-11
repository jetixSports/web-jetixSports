'use client'
import React, { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Buttons from '../../components/UX/Buttons/Buttons'
import { Box, Typography } from '@mui/material'
import Inputs from '../../components/UX/Inputs/Inputs'
import Form from '../../components/UX/Form/Form'

function useCreateStream({ dataStream, callback }: { dataStream?: { _idUser: string, _idTournament: string, _idMatch?: string, _idTeam?: string, type: string } | null, callback?: () => any }) {
    const { post } = useFetch()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [status, setStatus] = useState(true)
    const fields = {
        URL: register("URL", { required: "El URL del stream es obligatorio" }),
    }
    const onSubmit = async ({ URL }: { URL: string }) => {
        if (!status)
            return
        try {
            setStatus(false)
            if (!dataStream) return
            const { type, ...petitionData } = dataStream
            const srcPetition = type == "match" ? "/stream/match" : "/stream/tournament"
            const res = await post(
                process.env.NEXT_PUBLIC_HOST_SERVICE + srcPetition,
                {
                    ...petitionData,
                    URL
                }
            );
            setStatus(true)
            if (res.statusCode != 200)
                return toast.error(res.message)
            toast.success(res.message)
            if (callback)
                callback()
        } catch (error) {
            toast.error(error + "")
            setStatus(true)
        }
    }

    return {
        reset,
        reactForm: (
            <Form handleSubmit={handleSubmit(onSubmit as any)}>
                <Typography
                    sx={{
                        marginY: 1,
                        fontWeight: "bold",
                        color: "white",
                        textAlign: "center",
                        fontSize: 24,
                    }}
                >
                    Subir stream al {dataStream?.type == "match" ? "encuentro" : "torneo"}
                </Typography>

                <Box><Typography sx={{ color: "white" }}>URL del Stream</Typography>
                    <Inputs
                        sx={{ width: "100%", height: 36 }}
                        {...fields.URL}
                        error={!!errors?.URL}
                        helperText={errors?.URL?.message + ""}
                    ></Inputs>
                </Box>

                <Box
                    sx={{
                        minWidth: "290px",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Buttons
                        type="submit"
                        sx={{ marginTop: "5px", marginLeft: "auto" }}
                        variant="contained"
                    >
                        Guardar
                    </Buttons>
                </Box>
            </Form>
        ),
    };
}

export default useCreateStream

