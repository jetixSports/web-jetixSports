"use client"
import useFetch from '@/src/app/hooks/useFetch';
import { SelectChangeEvent } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface FormData {
  name: String;
  code: String;
  shortname: String;
}

function useCurrencyAdd() {

  const router = useRouter();
  const {data: session} =useSession();
  const user = session?.user;
  const { post } = useFetch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      code: '',
      shortname: '',
      }
    });



  const handleSubmitCurrency = async (data: FormData) => {
    if (isSubmitting || !user?._id) return;
    setIsSubmitting(true);

    const loadingToast = toast.loading('Guardando Divisa...');

    try {

      const currency = {
        name: data.name,
        code: data.code,
        shortname: data.shortname,
      };
      
      const response = await post(
        `${process.env.NEXT_PUBLIC_HOST_SERVICE}/currency`,
            currency
      );

      toast.dismiss(loadingToast);
      setIsSubmitting(false);

      if (!response || (response.statusCode !== 200 && response.statusCode !== 201)) {
        toast.error(response?.message || 'Error al guardar divisa', {
          duration: 4000,
          position: 'top-center',
        });
        return;
      }

      toast.success('¡Divisa guardada exitosamente!');
      reset();
      router.refresh();
    } catch (error) {
      console.error('Error en petición: ', error);
      toast.dismiss(loadingToast);
      setIsSubmitting(false);
      toast.error('Error al procesar la solicitud');
    }
  };

  return {
    handleSubmitCurrency: handleSubmit(handleSubmitCurrency), 
    register,
    errors,
    fields: {
      name: register('name', {
        required: 'El nombre es obligatorio',
      }),
      code: register('code', {
        required: 'El simbolo es obligatorio',
      }),
      shortname: register('shortname', {
        required: 'El abreviatura es obligatorio',
      }),
    },
    isSubmittingCurrency: isSubmitting,
    resetForm: () => reset(),
    reset,
  };
}

export default useCurrencyAdd;
