'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useFetch from "../hooks/useFetch";

interface Stream {
  torneoId: any;

  _id: string;
  _idTournament: string;
  _idSmatch: string;
  _idTeam: string;
  URL: string;
  status: string;
}

export default function useStream(defFilter?: { [key: string]: string }) {
  const { post } = useFetch();
  const [stream, setStream] = useState<Stream[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<{ [key: string]: string }>(defFilter ?? {})
  const fetchStream = async () => {
    try {
      setLoading(true);
      const response = await post(
        `${process.env.NEXT_PUBLIC_HOST_SERVICE}/stream/filter`,
        filter
      );

      if (response.data) {
        setStream(response.data);
      } else {
        throw new Error(response?.message ?? "Ha ocurrido un error");
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
  }, [filter]);

  return {
    stream,
    loading,
    error,
    setFilter,
    filter,
    refetch: fetchStream,
  };
}
