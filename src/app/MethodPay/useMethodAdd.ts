"use client";
import useFetch from "@/src/app/hooks/useFetch";
import { SelectChangeEvent } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useMethod from "./useMethod";

interface DetailsData {
  email?: string;
  bankNumber?: string;
  identity?: string;
  mobileCode?: string;
  phoneNumber?: string;
}

interface FormData {
  typePay: "bank_transfer" | "binance" | "mobile_payment";
  details: DetailsData;
}

function useMethodAdd({ callback }: { callback?: () => any }) {
  const router = useRouter();
  const { post } = useFetch();
  const { data: session } = useSession();
  const user = session?.user;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      typePay: undefined,
      details: {
        email: "",
        bankNumber: "",
        identity: "",
        mobileCode: "",
        phoneNumber: "",
      },
    },
  });

  const paymentType = watch("typePay");

  const handlePaymentTypeChange = (
    event: SelectChangeEvent<"bank_transfer" | "binance" | "mobile_payment">
  ) => {
    const value = event.target.value as
      | "bank_transfer"
      | "binance"
      | "mobile_payment";
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

  const handleSubmitAdd = async (data: FormData) => {
    if (isSubmitting || !user?._id) return;
    setIsSubmitting(true);

    const loadingToast = toast.loading("Guardando método de pago...");

    try {
      let filteredDetails: DetailsData = {};

      switch (data.typePay) {
        case "binance":
          filteredDetails = {
            email: data.details.email,
          };
          break;
        case "bank_transfer":
          filteredDetails = {
            bankNumber: data.details.bankNumber,
            identity: data.details.identity,
            phoneNumber: data.details.phoneNumber,
          };
          break;
        case "mobile_payment":
          filteredDetails = {
            mobileCode: data.details.mobileCode,
            identity: data.details.identity,
            phoneNumber: data.details.phoneNumber,
          };
          break;
      }

      const payload = {
        _idUser: user._id,
        typePay: data.typePay,
        details: filteredDetails,
      };

      const response = await post(
        `${process.env.NEXT_PUBLIC_HOST_SERVICE}/payments-details`,
        payload
      );

      toast.dismiss(loadingToast);
      setIsSubmitting(false);

      if (
        !response ||
        (response.statusCode !== 200 && response.statusCode !== 201)
      ) {
        toast.error(response?.message || "Error al guardar el método de pago", {
          duration: 4000,
          position: "top-center",
        });
        return;
      }

      toast.success("¡Método de pago guardado exitosamente!");
      reset();
      if (callback) callback();
    } catch (error) {
      console.error("Error en petición:", error);
      toast.dismiss(loadingToast);
      setIsSubmitting(false);
      toast.error("Error al procesar la solicitud");
    }
  };

  return {
    handleSubmitAdd: handleSubmit(handleSubmitAdd),
    register,
    errors,
    fields: {
      typePay: register("typePay", {
        required: "Método de pago obligatorio",
      }),
      details: {
        email: register("details.email", {
          required:
            paymentType === "binance"
              ? "Email obligatorio para Binance"
              : false,
          pattern:
            paymentType === "binance"
              ? {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                }
              : undefined,
        }),
        bankNumber: register("details.bankNumber", {
          required:
            paymentType === "bank_transfer"
              ? "Número de cuenta obligatorio"
              : false,
          minLength:
            paymentType === "bank_transfer"
              ? { value: 20, message: "Debe tener exactamente 20 dígitos" }
              : undefined,
          maxLength:
            paymentType === "bank_transfer"
              ? { value: 20, message: "Debe tener exactamente 20 dígitos" }
              : undefined,
          pattern:
            paymentType === "bank_transfer"
              ? { value: /^[0-9]+$/, message: "Solo se permiten números" }
              : undefined,
        }),
        identity: register("details.identity", {
          required: paymentType !== "binance" ? "Cédula obligatoria" : false,
          maxLength:
            paymentType !== "binance"
              ? { value: 8, message: "Máximo 8 dígitos" }
              : undefined,
          pattern:
            paymentType !== "binance"
              ? { value: /^[0-9]+$/, message: "Solo se permiten números" }
              : undefined,
        }),
        mobileCode: register("details.mobileCode", {
          required:
            paymentType === "mobile_payment"
              ? "Código de banco obligatorio"
              : false,
          maxLength:
            paymentType === "mobile_payment"
              ? { value: 4, message: "Máximo 4 dígitos" }
              : undefined,
          pattern:
            paymentType === "mobile_payment"
              ? { value: /^[0-9]+$/, message: "Solo se permiten números" }
              : undefined,
        }),
        phoneNumber: register("details.phoneNumber", {
          required: paymentType !== "binance" ? "Teléfono obligatorio" : false,
          minLength:
            paymentType !== "binance"
              ? { value: 11, message: "Debe tener 11 dígitos" }
              : undefined,
          maxLength:
            paymentType !== "binance"
              ? { value: 11, message: "Debe tener 11 dígitos" }
              : undefined,
          pattern:
            paymentType !== "binance"
              ? { value: /^[0-9]+$/, message: "Solo se permiten números" }
              : undefined,
        }),
      },
    },
    handlePaymentTypeChange,
    isSubmitting,
    resetForm: () => reset(),
    paymentType,
    reset,
  };
}

export default useMethodAdd;
