"use client"
import useFetch from '@/src/app/hooks/useFetch';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

function useMethodDelete(initialMethodId?: string | null) {
  const { delete: deleteRequest } = useFetch();
  const [methodId, setMethodId] = useState<string | null>(initialMethodId || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Handle para eliminar el método de pago usando el methodId del estado
  const handleDeleteMethod = async (methodId: string, onSuccess?: () => void) => {
    if (isSubmitting || !methodId) {
      toast.error('No se ha seleccionado un método de pago para eliminar');
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading('Eliminando método de pago...');
    console.log(methodId);
    
    try {
      const response = await deleteRequest(
        `${process.env.NEXT_PUBLIC_HOST_SERVICE}/payments-details/${methodId}`
      );

      toast.dismiss(loadingToast);
      setIsSubmitting(false);

      if (!response || (response.statusCode !== 200 && response.statusCode !== 201)) {
        toast.error(response?.message || 'Error al eliminar el método de pago', {
          duration: 4000,
          position: 'top-center',
        });
        return false; // Indica que la eliminación falló
      }

      toast.success('¡Método de pago eliminado exitosamente!');
      router.refresh()
       onSuccess?.();
      return true; 
    } catch (error) {
      console.error('Error al eliminar el método de pago:', error);
      toast.dismiss(loadingToast);
      setIsSubmitting(false);
      toast.error('Error al procesar la solicitud de eliminación');
      return false;
    }
  };

  return {
    methodId,
    setMethodIdDelet: setMethodId, // Exportamos para poder cambiar el ID desde el componente
    handleDeleteMethod,
    isSubmitting
  };
}

export default useMethodDelete;