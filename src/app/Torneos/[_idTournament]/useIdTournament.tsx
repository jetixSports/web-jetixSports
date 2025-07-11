"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import useFetch from "../../hooks/useFetch";
import { Teams, Tournaments } from "../../(auth)/dashboard/dashboard.types";
import { Match } from "../../types/matchs.types";
import { useRouter } from "next/navigation";

export default function useIdTournament({ _idTournament }: { _idTournament: string }) {
    const { post, get } = useFetch();
    const { data: session } = useSession();
    const user = session?.user;
    const router = useRouter()
    const [teams, setTeams] = useState<Teams[] | null>(null);
    const [tournament, setTournament] = useState<Tournaments | null>(null);
    const [users, setUsers] = useState<{ _id: string, firstName: string, lastName: string }[] | null>(null)
    const [matchs, setMatchs] = useState<Match[] | null>(null)
    useEffect(() => {
        (async () => {
            if (!user || teams || tournament || users || matchs) return;
            await getData()
        })();
    }, [user]);
    async function getData() {
        try {
            const tournamentRes = await post(
                process.env.NEXT_PUBLIC_HOST_SERVICE + "/tournaments/filter/",
                {
                    _id: _idTournament,
                }
            );
            if (tournamentRes.statusCode != 200) {
                router.back()
                return toast.error(tournamentRes.message + "");
            }

            const teams = await post(
                process.env.NEXT_PUBLIC_HOST_SERVICE + "/teams/filterByIds/",
                { _id: tournamentRes.data?.[0]?.teams.map((team: { _idTeam: string }) => team._idTeam) }
            );
            const matchs = await post(process.env.NEXT_PUBLIC_HOST_SERVICE + "/sport-match/findByIds/",
                { _id: tournamentRes.data?.[0]?.rounds.map((round: { _idMatchs: string[] }) => round._idMatchs).flat(1) }
            )
            const users = await post(process.env.NEXT_PUBLIC_HOST_SERVICE + "/users/getNames/",
                { _id: tournamentRes.data?.[0]?.teams.map((team: { playersMembers: string[] }) => team.playersMembers).flat(2) }
            )
            setMatchs(matchs?.data ?? null)
            setUsers(users?.data ?? null)
            setTeams(teams?.data ?? null);
            setTournament(tournamentRes.data?.[0] ?? null)
        } catch (error) {
            toast.error(error + "");
        }
    }
    return {
        teams,
        tournament,
        users,
        matchs,
        getData
    };
}
