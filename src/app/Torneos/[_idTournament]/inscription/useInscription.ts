"use client";
import { Teams, Tournaments } from "@/src/app/(auth)/dashboard/dashboard.types";
import useFetch from "@/src/app/hooks/useFetch";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function useInscription({ _idTournament }: { _idTournament: string }) {
  const router = useRouter();
  const { get, post } = useFetch();
  const { data: session } = useSession();
  const user = session?.user;
  const [teams, setTeams] = useState<Teams[] | null>();
  const [tournament, setTournament] = useState<Tournaments | null>();
  const [users, setUsers] = useState<
    { _id: string; firstName: string; lastName: string }[] | null
  >();
  const [status, setStatus] = useState(true);
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  useEffect(() => {
    (async () => {
      if (!user || teams) return;
      const teamsRes = await get(
        process.env.NEXT_PUBLIC_HOST_SERVICE + "/teams/member/" + user._id
      );
      const leaderTeams = teamsRes.data?.filter(
        (item: Teams) => item._idLeader == user._id
      );
      const myTournaments = await post(
        process.env.NEXT_PUBLIC_HOST_SERVICE + "/tournaments/filter/",
        {
          _id: _idTournament,
        }
      );
      const ids = leaderTeams?.map((item: Teams) => item.members).flat(2);
      const usersRes = await post(
        process.env.NEXT_PUBLIC_HOST_SERVICE + "/users/getNames/",
        { _id: ids }
      );
      setUsers(usersRes?.data ?? null);
      setTeams(leaderTeams ?? null);
      setTournament(myTournaments.data?.[0] ?? null);
      if (myTournaments.data[0]?.teamSpace == 1)
        setValue("playersMembers", [user._id]);
    })();
  }, [user]);

  const onSubmit = async ({
    _idTeam,
    playersMembers,
  }: {
    _idTeam: string;
    playersMembers: string[];
  }) => {
    if (!status) return;
    setStatus(false);
    const loadingToast = toast.loading("Inscribiendo..");
    const res = await post(
      process.env.NEXT_PUBLIC_HOST_SERVICE + "/tournaments/inscribe/",
      {
        _idTeam,
        playersMembers: Array.isArray(playersMembers)
          ? playersMembers
          : [playersMembers],
        _idTournament,
        _idUser: user?._id,
      }
    );

    toast.dismiss(loadingToast);
    setStatus(true);
    if (res?.statusCode != 200) {
      toast.error(
        !res?.message || res?.message == ""
          ? "Ha ocurrido un error."
          : res?.message,
        {
          duration: 4000,
          position: "top-center",
        }
      );
      return;
    }
    toast.success("¡Te has inscrito con exito!");
  };

  return {
    teams,
    users,
    watch,
    tournament,
    handleSubmit: handleSubmit(onSubmit as any),
    fields: {
      _idTeam: register("_idTeam", { required: "El equipo es obligatorio" }),
      playersMembers: register("playersMembers", {
        required: "Los miembros son obligatorios",
      }),
    },
    errors,
    status,
  };
}

export default useInscription;