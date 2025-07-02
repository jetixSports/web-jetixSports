"use client"
import React, { useEffect, useState } from 'react'
import { Teams, Tournaments } from './dashboard.types'
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import useFetch from '../../hooks/useFetch';

export default function useDashboard() {
    const { post, get } = useFetch()
    const { data: session, } = useSession();
    const user = session?.user;
    const [teams, setTeams] = useState<Teams[] | null>(null)
    const [myTournaments, setMyTournaments] = useState<Tournaments[] | null>(null)
    const [registeredTour, setRegisteredTour] = useState<Tournaments[] | null>(null)
    useEffect(() => {
        (async () => {
            if (!user || teams || myTournaments || registeredTour)
                return
            try {
                const teams = await get(process.env.NEXT_PUBLIC_HOST_SERVICE + "/teams/member/" + user._id,)
                const myTournaments = await post(process.env.NEXT_PUBLIC_HOST_SERVICE + "/tournaments/filter/", {
                    _idReferee: user._id
                })
                const registeredTour = await post(process.env.NEXT_PUBLIC_HOST_SERVICE + "/tournaments/filter/", {
                    teams: { playersMembers: user._id }
                })
                setTeams(teams?.data ?? null)
                setMyTournaments(myTournaments?.data ?? null)
                setRegisteredTour(registeredTour?.data ?? null)
            } catch (error) {
                toast.error(error + '')
            }
        })()
    }, [user])
    return ({
        teams,
        myTournaments,
        registeredTour
    })
}
