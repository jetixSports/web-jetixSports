'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useFetch from '../hooks/useFetch'; 
import { Currencytype} from "./useCurrencytype";

export default function useCurrency() {
  const { post } = useFetch();
  const [currencies, setCurrencies] = useState<Currencytype[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrency = async () => {
    setLoading(true);

    try {
      const res = await post(
        `${process.env.NEXT_PUBLIC_HOST_SERVICE}/currency/find`
      );

      if (!res || res.statusCode !== 200 || !Array.isArray(res.data)) {
        throw new Error(res?.message || 'Error al obtener divisas');
      }

      setCurrencies(res.data);
      setError(null);
    } catch (err: any) {
      console.error('[useCurrency] Error:', err);
      toast.error(err.message || 'Error al obtener Divisas de pago');
      setError(err.message || 'Error al obtener Divisas de pago');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrency();
  }, []);

  return {
    currencies,
    loading,
    error,
    refresh: fetchCurrency,
  };
}