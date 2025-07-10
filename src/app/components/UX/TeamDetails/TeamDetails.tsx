'use client'
import { Teams } from '@/src/app/(auth)/dashboard/dashboard.types'
import React, { useEffect, useState } from 'react'
import Form from '../Form/Form'
import { Box, CircularProgress, Typography } from '@mui/material'
import useFetch from '@/src/app/hooks/useFetch'

function TeamDetails({ team }: { team: Teams | null }) {
    const { post, get } = useFetch();
    const statusObj: { [key: string]: string } = { "active": "Activo", "inactive": "Inactivo", "disbanded": "Disuelto", "suspended": "Suspendido" }
    const [users, setUsers] = useState<{ _id: string, firstName: string, lastName: string }[] | null>(null)
    useEffect(() => {
        (async () => {
            if (!team)
                return
            const users = await post(process.env.NEXT_PUBLIC_HOST_SERVICE + "/users/getNames/",
                { _id: team.members }
            )
            setUsers(users?.data ?? null)
        })()
    }, [team])
    return (
        <Form handleSubmit={() => { }}>
            {users ? <>
                <Typography
                    sx={{
                        marginY: 1,
                        fontWeight: "bold",
                        color: "white",
                        textAlign: "center",
                        fontSize: 24,
                    }}
                >
                    Detalles del Equipo
                </Typography>
                <Box sx={{ width: "100%", display: "flex", gap: 1 }}>

                    <Typography sx={{
                        marginY: 1,
                        fontWeight: "bold",
                        color: "white",
                    }}>
                        Nombre:
                    </Typography>
                    <Typography sx={{
                        marginY: 1,
                        color: "white",
                    }}>
                        {team?.name}
                    </Typography>
                </Box>
                <Box sx={{ width: "100%", display: "flex", gap: 1 }}>

                    <Typography sx={{
                        marginY: 1,
                        fontWeight: "bold",
                        color: "white",
                    }}>
                        Descripcion:
                    </Typography>
                    <Typography sx={{
                        marginY: 1,
                        color: "white",
                    }}>
                        {team?.description}
                    </Typography>
                </Box>
                <Box sx={{ width: "100%", display: "flex", gap: 1 }}>

                    <Typography sx={{
                        marginY: 1,
                        fontWeight: "bold",
                        color: "white",
                    }}>
                        Estatus:
                    </Typography>
                    <Typography sx={{
                        marginY: 1,
                        color: "white",
                    }}>
                        {statusObj?.[team?.status ?? '']}
                    </Typography>
                </Box>
                <Box sx={{ width: "100%", display: "flex", gap: 1 }}>

                    <Typography sx={{
                        marginY: 1,
                        fontWeight: "bold",
                        color: "white",
                    }}>

                        Lider:
                    </Typography>
                    <Typography sx={{
                        marginY: 1,
                        color: "white",
                    }}>
                        {(() => {
                            console.log(users);
                            
                            const user = users.find(user => user._id == team?._idLeader)
                            return <Typography >{` ${user?.firstName} ${user?.lastName}`}</Typography>
                        })()}
                    </Typography>
                </Box>
                <Box sx={{ width: "100%", display: "flex", gap: 1 }}>

                    <Typography sx={{
                        marginY: 1,
                        fontWeight: "bold",
                        color: "white",
                    }}>
                        Creacion:
                    </Typography>
                    <Typography sx={{
                        marginY: 1,
                        color: "white",
                    }}>
                        {new Date(team?.createdDate ?? '').toLocaleDateString()}
                    </Typography>
                </Box>
                <Box sx={{ width: "100%",  gap: 1 }}>
                    <Typography sx={{
                        marginY: 1,
                        fontWeight: "bold",
                        color: "white",
                    }}>
                        Miembros:
                    </Typography>
                    <Box sx={{ paddingLeft: 2 }}>
                        {team?.members.map((_idUser, index) => {
                            const user = users?.find(u => u._id == _idUser)
                            return (
                                <Typography color='white' key={index}>{`${index + 1}) ${user?.firstName} ${user?.lastName}`}</Typography>
                            )
                        })}
                    </Box>
                </Box>
            </> :
                <Box display="flex" justifyContent="center" my={4}>
                    <CircularProgress />
                </Box>
            }
        </Form >
    )
}

export default TeamDetails