'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useFetch from "./hooks/useFetch";

interface Torneo {
  _id: string;
  name: string;
  typeSport: string;
  status:string;
  quotas: number;
  teamSpace:number;
  amount: string;
  startDate: string;
  _idImg: string;
  teams:any[]
}

export default function usePage() {

    const { post} = useFetch();
    const [TorneoDes, setTorneos] = useState<Torneo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
const fetchTorneosProximos = async () => {
    try {
      setLoading(true);
      const response = await post(
        `${process.env.NEXT_PUBLIC_HOST_SERVICE}/tournaments/filter`,
        {}
      );

      if (response.data) {
        setTorneos(response.data);
      } else {
        throw new Error(response?.message??"Ha ocurrido un error");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      console.error("Error obteniendo torneos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTorneosProximos();
  }, []);

  return {
    TorneoDes,
    loading,
    error,
    refetch: fetchTorneosProximos,
  };
}
