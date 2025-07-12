"use client"
import useFetch from '@/src/app/hooks/useFetch';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface PaymentMethodData {
    typePay: string;
    details: object;
}

function useMethodPay() {
    const router = useRouter();
    const { post } = useFetch();
    const { data: session } = useSession();
    const user = session?.user;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethodData[]>([]);
    
    const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
        setValue,
        control
    } = useForm();

    const addPaymentMethod = (method: PaymentMethodData) => {
        setPaymentMethods([...paymentMethods, method]);
    };

    const removePaymentMethod = (index: number) => {
        const newMethods = [...paymentMethods];
        newMethods.splice(index, 1);
        setPaymentMethods(newMethods);
    };

    const onSubmit = async (data: { 
        typePay?: string;
        details?: object;
    }) => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        
        const loadingToast = toast.loading('Procesando pago...');
        
        try {
            const payload = {
                _idUser: user?._id,
                paymentMethods: paymentMethods.length > 0 ? paymentMethods : 
                    (data.typePay && data.details ? [{ 
                        typePay: data.typePay, 
                        details: data.details 
                    }] : [])
            };

            const res = await post(
                process.env.NEXT_PUBLIC_HOST_SERVICE + "/payments-details",
                payload
            );
            
            toast.dismiss(loadingToast);
            setIsSubmitting(false);
            
            if (res?.statusCode !== 200) {
                toast.error(res?.message || "Ha ocurrido un error al procesar el pago", {
                    duration: 4000,
                    position: 'top-center',
                });
                return;
            }
            
            toast.success('¡Método de pago agregado exitosamente!');
            const redirectToast = toast.loading('Redireccionando...');
            setTimeout(() => {
                router.push('/');
                toast.dismiss(redirectToast);
            }, 500);
        } catch (error) {
            toast.dismiss(loadingToast);
            setIsSubmitting(false);
            toast.error('Ha ocurrido un error al procesar el pago');
            console.error('Error en useMethodPay:', error);
        }
    }

    return {
        paymentMethods,
        addPaymentMethod,
        removePaymentMethod,
        isSubmitting,
        watch,
        control,
        handleSubmit: handleSubmit(onSubmit),
        register,
        errors,
        setValue,
        fields: {
            typePay: register('_idTeam', { required: 'El equipo es obligatorio', }),
            Details: register('playersMembers', { required: 'Los miembros son obligatorios' })
        },
    }
}

export default useMethodPay;