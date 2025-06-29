'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import useFetch from "../../hooks/useFetch";

export default function useSignUp() {
  const {post}=useFetch();
  const router = useRouter()
  const [status, setStatus] = useState(true);
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch
  } = useForm();



  const onSubmit = async ({name, lastname, nameUser, email, password }: { name:string, lastname:string, nameUser:String ,email: string, password: string }) => {
    if (!status) return
    setStatus(false)
    const loadingToast = toast.loading('Creando cuenta...');
      
    const res = await post(process.env.NEXT_PUBLIC_HOST_SERVICE + '/auth/signUp',{
      name:name,
      lastname:lastname,
      username:nameUser,
      email:email,
      password:password
    });

    toast.dismiss(loadingToast);
    setStatus(true)
    if (res.statusCode!=200) {
      toast.error(res.message, {
        duration: 4000,
        position: 'top-center',
      });
      console.log(res);
      return;
    }
    toast.success('¡Se ha registrado con exito!');
    toast.loading('Redireccionando...');
    setTimeout(()=>router.push('/login'),500)
    
  }

  return {
    
    handleSubmit: handleSubmit(onSubmit as any),
    fields: {
      name: register('name',{ required: 'El nombre es obligatorio' }),
      lastname: register('lastname', {required:'El apellido es obligatorio'}),
      nameUser: register('nameUser', {required:'El nombre de usuario es obligatorio'}),
      email: register('email', { required: 'El correo es obligatorio' } ) ,
      password: register('password',{required: 'La contraseña es obligatoria'}),
      passwordSecond: register('passwordSecond', { required: 'La contraseña es obligatoria', validate:(value)=>{
        return watch('password')==value ? true : "la contrasenas no se parecen"
      } }),
    },
    errors,
    status
  }
}
