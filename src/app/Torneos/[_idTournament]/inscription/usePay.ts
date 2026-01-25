"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import {
  PaymentDetails,
  Tournaments,
} from "@/src/app/(auth)/dashboard/dashboard.types";
import useFetch from "@/src/app/hooks/useFetch";
import useInscription from "./useInscription";
import { useRouter } from "next/navigation";

export default function usePay({
  _idTournament,
  inscribeCallback,
}: {
  _idTournament: string;
  inscribeCallback: () => any;
}) {
  const router = useRouter();
  const { post } = useFetch();
  const [tournament, setTournament] = useState<Tournaments | null>();
  const { payDetails } = useInscription({ _idTournament: _idTournament });
  const { data: session, status: sessionStatus } = useSession();
  const user = session?.user;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const _idPayDetails = payDetails?.[0]?._id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      transactionCode: "",
      amount: "",
      rateExchange: "",
      currency: "",
      _idImg: null,
    },
  });

  const fieldss = {
    transactionCode: register("transactionCode", {
      required: "El código de transacción es obligatorio",
      minLength: {
        value: 6,
        message: "Maximo 6 caracteres",
      },
      maxLength: {
        value: 6,
        message: "Maximo 6 caracteres",
      },
    }),
    amount: register("amount", {
      required: "El monto es obligatorio",
      min: {
        value: 0.01,
        message: "El monto debe ser mayor a 0",
      },
    }),
    rateExchange: register("rateExchange", {
      required: "La tasa de cambio es obligatoria",
      min: {
        value: 0.0001,
        message: "La tasa debe ser mayor a 0",
      },
    }),
    currency: register("currency", {
      required: "La divisa es obligatoria",
    }),
    _idImg: register("_idImg", {
      required: "La imagen es obligatoria",
    }),
  };

  const onSubmit = async (data: any) => {
    if (isSubmitting || !user) return;

    try {
      setIsSubmitting(true);
      setIsloading(true);
      if (inscribeCallback) {
        let inscribStatus = await inscribeCallback();
        if (![200, 403].includes(inscribStatus.statusCode))
          return toast.error(inscribStatus.message);
      }

      const formData = new FormData();

      // Agregar todos los campos del formulario
      Object.entries(data).forEach(([key, value]) => {
        if (key === "_idImg" && value instanceof FileList) {
          formData.append("file", value[0]);
        } else {
          formData.append(key, String(value));
        }
      });

      // Agregar metadatos necesarios
      formData.append("_idUser", (user as any)._id || user.id || "");
      formData.append("_idTournament", _idTournament);
      formData.append("_idReceiveDetails", _idPayDetails?.toString() || "");
      formData.append("creationDate", new Date().toISOString());

      const response = await post(
        `${process.env.NEXT_PUBLIC_HOST_SERVICE}/payments-history`,
        formData,
        true
      );
      toast.dismiss();

      if (response.statusCode != 200) {
        throw new Error(response.message || "Error al registrar el pago");
      }

      toast.success("¡Pago registrado exitosamente!");
      router.push("./");
    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error(error.message || "Error en el servidor");
    } finally {
      setIsSubmitting(false);
      setIsloading(false);
    }
  };

  return {
    handleSubmitPay: handleSubmit(onSubmit),
    fieldss,
    errors,
    isSubmitting,
    isloading,
  };
}
