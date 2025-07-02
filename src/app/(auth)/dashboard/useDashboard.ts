"use client";
import React, { useEffect, useState } from "react";
import { Teams, Tournaments } from "./dashboard.types";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import useFetch from "../../hooks/useFetch";

export default function useDashboard() {
  const { post, get } = useFetch();
  const { data: session } = useSession();
  const user = session?.user;
  const [teams, setTeams] = useState<Teams[] | null>(null);
  const [myTournaments, setMyTournaments] = useState<Tournaments[] | null>(
    null
  );
  const [registeredTour, setRegisteredTour] = useState<Tournaments[] | null>(
    null
  );
  useEffect(() => {
    (async () => {
      if (!user || teams || myTournaments || registeredTour) return;
      try {
        await getTeams();
        await getMyTournaments();
        await getRegisteredTour();
      } catch (error) {
        toast.error(error + "");
      }
    })();
  }, [user]);
  async function getTeams() {
    if (!user) return;
    const teams = await get(
      process.env.NEXT_PUBLIC_HOST_SERVICE + "/teams/member/" + user._id
    );
    setTeams(teams?.data ?? null);
  }
  async function getMyTournaments() {
    if (!user) return;
    const myTournaments = await post(
      process.env.NEXT_PUBLIC_HOST_SERVICE + "/tournaments/filter/",
      {
        _idReferee: user._id,
      }
    );
    setMyTournaments(myTournaments?.data ?? null);
  }
  async function getRegisteredTour() {
    if (!user) return;
    const registeredTour = await post(
      process.env.NEXT_PUBLIC_HOST_SERVICE + "/tournaments/filter/",
      {
        teams: { playersMembers: user._id },
      }
    );
    setRegisteredTour(registeredTour?.data ?? null);
  }
  return {
    teams,
    myTournaments,
    registeredTour,
    getTeams,
    getMyTournaments,
    getRegisteredTour,
  };
}
