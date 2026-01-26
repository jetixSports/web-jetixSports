"use client"
import { Box, MenuItem, Select, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import Inputs from "../../components/UX/Inputs/Inputs";
import Form from "../../components/UX/Form/Form";
import Buttons from "../../components/UX/Buttons/Buttons";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

function useUpdateStream({ def, callback }: { def: any, callback?: () => any }) {
  const { post, put } = useFetch()
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({})
  const [status, setStatus] = useState(true)
  const { data: session, } = useSession();
  const user = session?.user;
  const fields: { [key: string]: any } = {
    title: register("title", { required: "El titulo es obligatorio" }),
    imgSrc: register("imgSrc", { required: "la imagen es obligatoria" }),
    URL: register("URL", { required: "La URL es obligatoria" }),
    status: register("status", { required: "el estatus es obligatorio" })
  }
  useEffect(() => {
    Object.entries(def ?? {}).forEach(([key, value]: any) => {
      if (!!fields?.[key]) {
        setValue(key, value)
      }
    })
  }, [def])
  const onSubmit = async (data: { name: string, description: string, file: any }) => {
    if (!status)
      return
    try {
      setStatus(false)
      const updateUser = await put(process.env.NEXT_PUBLIC_HOST_SERVICE + '/stream/', { ...data, _id: def._id, _idUser: user?._id },)
      setStatus(true)

      if (updateUser.statusCode != 200)
        return toast.error(updateUser.message)
      toast.success('Stream editado con exito')
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
          Editar Stream
        </Typography>
        {!def && <Typography sx={{ color: "red" }}>No se encontraron datos del Stream</Typography>}

        <Typography sx={{ color: "white" }}>Titulo</Typography>
        <Inputs
          disabled={!def}
          sx={{ width: "100%", height: 36 }}
          {...fields.title}
          error={!!errors?.title}
          helperText={errors?.title?.message + ""}
        ></Inputs>
        <Typography sx={{ color: "white" }}>Enlace de la imagen</Typography>
        <Inputs
          disabled={!def}
          sx={{ width: "100%", height: 36 }}
          {...fields.imgSrc}
          error={!!errors?.imgSrc}
          helperText={errors?.imgSrc?.message + ""}
        ></Inputs>
        <Typography sx={{ color: "white" }}>Enlace del Stream</Typography>
        <Inputs
          disabled={!def}
          type="URL"
          sx={{ width: "100%", height: 36 }}
          {...fields.URL}
          error={!!errors?.URL}
          helperText={errors?.URL?.message + ""}
        ></Inputs>
        <Typography sx={{ marginY: 1, color: "white" }}>
          Estatus del Stream
        </Typography>
        <Select
          disabled={!def}
          sx={{
            width: "100%", marginTop: '4px', height: 36, backgroundColor: '#20105B',
            borderRadius: "10px", color: 'white'
          }}
          {...fields.status}
          error={!!errors?.status}
        >
          <MenuItem value={'active'} >
            Activo
          </MenuItem>
          <MenuItem value={'inactive'} >
            Inactivo
          </MenuItem>

        </Select>
        <Box
          sx={{
            minWidth: "290px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Buttons
            disabled={!def}
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

export default useUpdateStream