'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useFetch from "../hooks/useFetch";

interface Stream {
    torneoId: any;

    _id : string;
    _idTournament : string;
    _idSmatch : string;
    _idTeam: string;
    URL: string;
    status : string;
}

export default function useStream() {

    const { post} = useFetch();
    const [stream, setStream] = useState<Stream[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const fetchStream = async () => {
    try {
      setLoading(true);
      const response = await post(
        `${process.env.NEXT_PUBLIC_HOST_SERVICE}/stream/filter`,
        {}
      );

      if (response.data) {
        setStream(response.data);
      } else {
        throw new Error(response?.message??"Ha ocurrido un error");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      console.error("Error obteniendo Stream:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStream();
  }, []);

  return {
    stream,
    loading,
    error,
    refetch: fetchStream,
  };
}
