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

function useCreateTeam({ callback }: { callback?: () => any }) {
  const { post } = useFetch()
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [status, setStatus] = useState(true)
  const { data: session, } = useSession();
  const user = session?.user;
  const fields = {
    name: register("name", { required: "El nombre es obligatorio" }),
    description: register("description", { required: "la descripción es obligatoria" }),
    file: register("file", { required: "La imagen es obligatoria" })
  }
  const onSubmit = async (data: { name: string, description: string, file: any }) => {
    if (!status)
      return
    try {
      setStatus(false)

      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        const newValue = key == "file" ? value[0] : value
        formData.append(key, newValue)
      })
      
      formData.append("_idLeader", user?._id ?? "")
      const updateUser = await post(process.env.NEXT_PUBLIC_HOST_SERVICE + '/teams/', formData, true)
      setStatus(true)
      
      if (updateUser.statusCode != 200)
        return toast.error(updateUser.message)
      toast.success(updateUser.message)
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
          Crear un Equipo
        </Typography>
        <Typography sx={{ color: "white" }}>Nombre del equipo</Typography>
        <Inputs
          sx={{ width: "100%", height: 36 }}
          {...fields.name}
          error={!!errors?.name}
          helperText={errors?.name?.message + ""}
        ></Inputs>
        <Typography sx={{ color: "white" }}>Descripción del equipo</Typography>
        <Inputs
          sx={{ width: "100%", height: 36 }}
          {...fields.description}
          error={!!errors?.description}
          helperText={errors?.description?.message + ""}
        ></Inputs>
        <Typography sx={{ color: "white" }}>Foto del equipo</Typography>
        <Inputs
          type="file"
          sx={{ width: "100%", height: 36 }}
          {...fields.file}
          error={!!errors?.file}
          helperText={errors?.file?.message + ""}
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

export default useCreateTeam