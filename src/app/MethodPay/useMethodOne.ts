'use client';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
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

export default function useMethodOne(initialMethodId?: string | null) {
  const { data: session } = useSession();
  const { post } = useFetch();
  const [method, setMethod] = useState<PaymentDetails | null>(null);
  const [methodId, setMethodId] = useState<string | null>(initialMethodId || null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const user = session?.user;

  const fetchMethod = async (id?: string | null) => {
    const targetId = id || methodId;
    if (!user?._id || !targetId) {
      setMethod(null);
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Cargando método de pago...');

    try {
        const res = await post(
            process.env.NEXT_PUBLIC_HOST_SERVICE + "/payments-details/find",
            {
                _id:  targetId,
            }
        );
    
      console.log(res.data);
      if (!res || res.statusCode !== 200) {
        throw new Error(res?.message || 'Error desconocido');
      }

      setMethod(res.data);
      setError(null);
    } catch (err: any) {
      console.error('[useMethodOne] Error:', err);
      toast.error('Error al obtener el método de pago');
      
      setError(err.message || 'Error al obtener el método de pago');
      setMethod(null);
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }

    console.log('dentro de useOne ',method);
  };

  useEffect(() => {
    fetchMethod();
  }, [user?._id, methodId]);

  return {
    method,
    loading,
    error,
    methodId,
    setMethodId, 
    refresh: fetchMethod,
  };
}