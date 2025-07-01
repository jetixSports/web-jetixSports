import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';

interface Torneo {
  id: number;
  name: string;
  typeSport: string;
  status:string;
  quotas: number;
  teamSpace:number;
  amount: string;
  startDate: string;
  image: any;
}

export default function useTorneos() {
  const { get } = useFetch();
  const [torneos, setTorneos] = useState<Torneo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTorneos = async () => {
    try {
      setLoading(true);
      const response = await get(
        `${process.env.NEXT_PUBLIC_HOST_SERVICE}/api/torneos?sort=fecha_asc&sort=status="active"`
      );

      if (typeof response === 'string' && response.startsWith('<!DOCTYPE')) {
        throw new Error('El servidor devolvió una página HTML en lugar de datos JSON');
      }

      if (response.data) {
        setTorneos(response.data);
      } else {
        throw new Error('No se recibieron datos de torneos');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar torneos');
      console.error('Error obteniendo torneos:', err);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTorneos();
  }, []);

  return {
    torneos,
    loading,
    error,
    refetch: fetchTorneos
  };
}