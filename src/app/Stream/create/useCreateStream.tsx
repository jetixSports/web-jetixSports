"use client"
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import Inputs from "../../components/UX/Inputs/Inputs";
import Form from "../../components/UX/Form/Form";
import Buttons from "../../components/UX/Buttons/Buttons";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

function useCreateStream({ callback }: { callback?: () => any }) {
  const { post } = useFetch()
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [status, setStatus] = useState(true)
  const { data: session, } = useSession();
  const user = session?.user;
  const fields = {
    title: register("title", { required: "El titulo es obligatorio" }),
    imgSrc: register("imgSrc", { required: "la imagen es obligatoria" }),
    URL: register("URL", { required: "La URL es obligatoria" })
  }
  const onSubmit = async (data: { name: string, description: string, file: any }) => {
    if (!status)
      return
    try {
      setStatus(false)
      const updateUser = await post(process.env.NEXT_PUBLIC_HOST_SERVICE + '/stream/', { ...data, _idUser: user?._id },)
      setStatus(true)

      if (updateUser.statusCode != 200)
        return toast.error(updateUser.message)
      toast.success('Stream creado con exito')
      if (callback)
        callback()
    } catch (error) {
      toast.error(error + "")
      setStatus(true)
    }
  }
  return {
    reset,
    reactForm: (
      <Form handleSubmit={handleSubmit(onSubmit as any)}>
        <Typography
          sx={{
            marginY: 1,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            fontSize: 24,
          }}
        >
          Subir datos del Stream
        </Typography>
        <Typography sx={{ color: "white" }}>Titulo</Typography>
        <Inputs
          sx={{ width: "100%", height: 36 }}
          {...fields.title}
          error={!!errors?.title}
          helperText={errors?.title?.message + ""}
        ></Inputs>
        <Typography sx={{ color: "white" }}>Enlace de la imagen</Typography>
        <Inputs
          sx={{ width: "100%", height: 36 }}
          {...fields.imgSrc}
          error={!!errors?.imgSrc}
          helperText={errors?.imgSrc?.message + ""}
        ></Inputs>
        <Typography sx={{ color: "white" }}>Enlace del Stream</Typography>
        <Inputs
          type="URL"
          sx={{ width: "100%", height: 36 }}
          {...fields.URL}
          error={!!errors?.URL}
          helperText={errors?.URL?.message + ""}
        ></Inputs>
        <Box
          sx={{
            minWidth: "290px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Buttons
            type="submit"
            sx={{ marginTop: "5px", marginLeft: "auto" }}
            variant="contained"
          >
            Guardar
          </Buttons>
        </Box>
      </Form>
    ),
  };
}

export default useCreateStream