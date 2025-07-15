'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useFetch from '../hooks/useFetch'; 

interface Currency {
  _id: string;
  name: string;
  code: string;
  shortname: string;
}

export default function useCurrency() {
  const { post } = useFetch();
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrency = async () => {
    setLoading(true);
    const toastId = toast.loading('Cargando lista de Divisas...');

    try {
      const res = await post(
        `${process.env.NEXT_PUBLIC_HOST_SERVICE}/currency/find`
      );

      if (!res || res.statusCode !== 200 || !Array.isArray(res.data)) {
        throw new Error(res?.message || 'Error al obtener divisas');
      }

      setCurrencies(res.data);
      setError(null);
      toast.success('Divisas cargadas correctamente', { id: toastId });
    } catch (err: any) {
      console.error('[useCurrency] Error:', err);
      toast.error(err.message || 'Error al obtener Divisas de pago', { id: toastId });
      setError(err.message || 'Error al obtener Divisas de pago');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrency();
  }, []); // Eliminada la dependencia de user._id ya que las divisas son generales

  return {
    currencies,
    loading,
    error,
    refresh: fetchCurrency,
  };
}