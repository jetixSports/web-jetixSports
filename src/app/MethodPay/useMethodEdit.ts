"use client"
import useFetch from '@/src/app/hooks/useFetch';
import { SelectChangeEvent } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useMethod from './useMethod';
import useMethodOne from './useMethodOne'; 

interface DetailsData {
  email?: string;
  bankNumber?: string;
  identity?: string;
  mobileCode?: string;
  phoneNumber?: string;
}

interface FormData {
  typePay: string;
  details: DetailsData;
}

function useMethodEdit() {
  const router = useRouter();
  const { put } = useFetch();
  const { data: session } = useSession();
  const user = session?.user;
  const { refresh } = useMethod(); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null);
  

  const { method: selectedMethod, refresh: refreshMethod } = useMethodOne(selectedMethodId);
  
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      typePay: undefined,
      details: {
        email: '',
        bankNumber: '',
        identity: '',
        mobileCode: '',
        phoneNumber: ''
      }
    }
  });

  const paymentType = watch('typePay');

  const loadMethodData = (methodId: string) => {
    setSelectedMethodId(methodId);
  };

  useEffect(() => {
    if (!selectedMethod) return;
    
    setValue('typePay', selectedMethod.typePay);
    
    const details: DetailsData = {};
    if (selectedMethod.details.email) details.email = selectedMethod.details.email;
    if (selectedMethod.details.bankNumber) details.bankNumber = selectedMethod.details.bankNumber;
    if (selectedMethod.details.identity) details.identity = selectedMethod.details.identity;
    if (selectedMethod.details.mobileCode) details.mobileCode = selectedMethod.details.mobileCode;
    if (selectedMethod.details.phoneNumber) details.phoneNumber = selectedMethod.details.phoneNumber;
    
    setValue('details', details);
  }, [selectedMethod, setValue]);

  const handlePaymentTypeChange = (
    event: SelectChangeEvent<'bank_transfer' | 'binance' | 'mobile_payment'>
  ) => {
    const value = event.target.value as 'bank_transfer' | 'binance' | 'mobile_payment';
    reset(
      {
        typePay: value,
        details: {},
      },
      {
        keepErrors: false,
      }
    );
  };

  const handleSubmitEdit = async (data: FormData) => {
    if (isSubmitting || !user?._id || !selectedMethodId) return;
    setIsSubmitting(true);

    const loadingToast = toast.loading('Actualizando método de pago...');

    try {
      let filteredDetails: DetailsData = {};

      switch (data.typePay) {
        case 'binance':
          filteredDetails = {
            email: data.details.email,
          };
          break;
        case 'bank_transfer':
          filteredDetails = {
            bankNumber: data.details.bankNumber,
            identity: data.details.identity,
            phoneNumber: data.details.phoneNumber,
          };
          break;
        case 'mobile_payment':
          filteredDetails = {
            mobileCode: data.details.mobileCode,
            identity: data.details.identity,
            phoneNumber: data.details.phoneNumber,
          };
          break;
      }

      const payload = {
        _id: selectedMethodId,
        _idUser: user._id,
        typePay: data.typePay,
        details: filteredDetails,
      };
      const methodId = payload._id

      const response = await put(
            process.env.NEXT_PUBLIC_HOST_SERVICE + "/payments-details/" + {methodId},
            {
                payload
            }
        );

      toast.dismiss(loadingToast);
      setIsSubmitting(false);

      if (!response || response.statusCode !== 200) {
        toast.error(response?.message || 'Error al actualizar el método de pago', {
          duration: 4000,
          position: 'top-center',
        });
        return;
      }

      toast.success('¡Método de pago actualizado!');
      reset();
      refresh(); 
      refreshMethod(); 
      setSelectedMethodId(null);
      
    } catch (error) {
      console.error('Error en petición:', error);
      toast.dismiss(loadingToast);
      setIsSubmitting(false);
      toast.error('Error al procesar la solicitud');
    }
  };

  return {
    handleSubmitEdit: handleSubmit(handleSubmitEdit),
    register,
    errorss: errors,
    fieldss: {
      typePay: register('typePay', {
        required: 'Método de pago obligatorio',
      }),
      details: {
        email: register('details.email', {
          pattern:
            paymentType === 'binance'
              ? {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido',
                }
              : undefined,
        }),
        bankNumber: register('details.bankNumber', {
          minLength:
            paymentType === 'bank_transfer'
              ? { value: 20, message: 'Debe tener exactamente 20 dígitos' }
              : undefined,
          maxLength:
            paymentType === 'bank_transfer'
              ? { value: 20, message: 'Debe tener exactamente 20 dígitos' }
              : undefined,
          pattern:
            paymentType === 'bank_transfer'
              ? { value: /^[0-9]+$/, message: 'Solo se permiten números' }
              : undefined,
        }),
        identity: register('details.identity', {
          maxLength:
            paymentType !== 'binance'
              ? { value: 8, message: 'Máximo 8 dígitos' }
              : undefined,
          pattern:
            paymentType !== 'binance'
              ? { value: /^[0-9]+$/, message: 'Solo se permiten números' }
              : undefined,
        }),
        mobileCode: register('details.mobileCode', {
          maxLength:
            paymentType === 'mobile_payment'
              ? { value: 4, message: 'Máximo 4 dígitos' }
              : undefined,
          pattern:
            paymentType === 'mobile_payment'
              ? { value: /^[0-9]+$/, message: 'Solo se permiten números' }
              : undefined,
        }),
        phoneNumber: register('details.phoneNumber', {
          minLength:
            paymentType !== 'binance'
              ? { value: 11, message: 'Debe tener 11 dígitos' }
              : undefined,
          maxLength:
            paymentType !== 'binance'
              ? { value: 11, message: 'Debe tener 11 dígitos' }
              : undefined,
          pattern:
            paymentType !== 'binance'
              ? { value: /^[0-9]+$/, message: 'Solo se permiten números' }
              : undefined,
        }),
      },
    },
     handlePaymentTypeChangeEdit: handlePaymentTypeChange,
    loadMethodData,
     isSubmittingEdit: isSubmitting,
    resetForm: () => {
      reset();
      setSelectedMethodId(null);
    },
    paymentTypeEdit: paymentType,
    selectedMethodId,
    selectedMethodEdit: selectedMethod, 
  };
}

export default useMethodEdit;