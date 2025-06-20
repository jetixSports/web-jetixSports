'use client'
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";

export default function useLogin() {
  const router = useRouter()
  const [status, setStatus] = useState(true)
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  
  const onSubmit = async ({ email, password }: { email: string, password: string }) => {
    if (!status) return
    setStatus(false)
    const loadingToast = toast.loading('Iniciando sesion...');

    const res = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
    });

    toast.dismiss(loadingToast);
    setStatus(true)
    if (res?.status!=200) {
      toast.error(!res?.error || res?.error==''?"Ha ocurrido un error.":res?.error, {
        duration: 4000,
        position: 'top-center',
      });
      return;
    }
    toast.success('¡Se ha iniciado sesion con exito!');
    const redirectToast=toast.loading('Redireccionando...');
    setTimeout(()=>{
      router.push('/');
      toast.dismiss(redirectToast);
    },500)
  }
  
  return {
    handleSubmit: handleSubmit(onSubmit as any),
    fields: {
      email: register('email', { required: 'El correo es obligatorio',}),
      password: register('password', { required: 'La contraseña es obligatoria' })
    },
    errors,
    status
  }
}
