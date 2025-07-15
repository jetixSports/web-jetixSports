'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useFetch from '../hooks/useFetch'; 

type PaymentDetails = {
  _id: string;
  _idUser: string;
  typePay: string;
  details: {
    email: string;
    bankNumber: string;
    identity: string;
    mobileCode: string;
    phoneNumber: string;
  };
};

export default function useMethod() {
  const { data: session } = useSession();
  const { post } = useFetch();
  const [methods, setMethods] = useState<PaymentDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const user = session?.user;

  const fetchMethods = async () => {
    if (!user?._id) {
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Cargando métodos de pago...');

    try {
      const res = await post(
        `${process.env.NEXT_PUBLIC_HOST_SERVICE}/payments-details/find`,{ _idUser: user?._id }
      );

      if (!res || res.statusCode !== 200 || !Array.isArray(res.data)) {
        throw new Error(res?.message || 'Error desconocido');
      }

      setMethods(res.data);
      setError(null);
    } catch (err: any) {
      console.error('[useMethod] Error:', err);
      toast.error('Error al obtener métodos de pago');
      setError(err.message || 'Error al obtener métodos de pago');
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    fetchMethods();
  }, [user?._id]);

  return {
    methods,
    loading,
    error,
    refresh: fetchMethods,
  };
}