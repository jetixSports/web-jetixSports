"use client"
import { Box, Typography, MenuItem,Select } from "@mui/material";
import { useForm } from "react-hook-form";
import Inputs from "../../components/UX/Inputs/Inputs";
import Formlarge from "../../components/UX/Form/Formlarge";
import Buttons from "../../components/UX/Buttons/Buttons";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

function useCreateTorneo({ callback }: { callback?: () => any }) {
  const { post } = useFetch()
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [status, setStatus] = useState(true)
  const { data: session, } = useSession();
  const user = session?.user;
  const juegosOptions = [
    { value: 'Valorant', label: 'Valorant' },
    { value: 'League of Legends', label: 'League of Legends' },
    { value: 'FIFA', label: 'FIFA' },
    { value: 'Pokemon', label: 'Pokemon' },
    { value: 'Caida', label: 'Caida' },
  ]


  const fields = {
    name: register("name", { required: "El nombre es obligatorio" }),
    description: register("description", { required: "la descripción es obligatoria" }),
    typeSport:register("typeSport", { required: "El Juego es obligatoria" }),
    quotas: register("quotas", { required: "la campo obligatorio" }),
    teamSpace: register("teamSpace", { required: "la descripción es obligatoria" }),
    startDate: register("startDate", { required: "la fecha es obligatoria" }),
    endDate: register("endDate", { required: "la fecha es obligatoria" }),
    file: register("file", { required: "La imagen es obligatoria" })
  }
  const onSubmit = async (data: { name: string, description: string, typeSport: string, quotas:number, teamSpace:number, startDate: Date, endDate: Date, file: any }) => {
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
      const creatTorneo = await post(process.env.NEXT_PUBLIC_HOST_SERVICE + '/tornaments/', formData, true)
      setStatus(true)
      if (creatTorneo.statusCode != 200)
        return toast.error(creatTorneo.message)
      toast.success(creatTorneo.message)
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

        <Formlarge handleSubmit={handleSubmit(onSubmit as any)}>
          <Typography
            sx={{
              marginY: 1,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              fontSize: 24,
            }}
          >
            Crear un Torneo
          </Typography>

          <Typography sx={{ color: "white" }}>Nombre del Torneo</Typography>
          <Inputs
            sx={{ width: "100%", height: 36 }}
            {...fields.name}
            error={!!errors?.name}
            helperText={errors?.name?.message + ""}
          ></Inputs>

          <Typography sx={{ marginY: 1, fontWeight: 'bold', color: "white", fontSize:14}}>
              Selecciona el Juego
          </Typography>
          <Inputs
            sx={{ width: "98%", marginTop:'4px', height: 36, marginLeft:'6%', backgroundColor:'#20105B',
              borderRadius:"10px",color:'white'}}
              {...fields.typeSport}
              error={!!errors?.typeSport}
              helperText={errors?.typeSport?.message + ""}
            
            >
              
          </Inputs>

          <Typography sx={{ color: "white" }}>Detalles del torneo</Typography>
          <Inputs
            multiline
            rows={3}
            sx={{ width: "100%", height: 60 }}
            {...fields.description}
            error={!!errors?.description}
            helperText={errors?.description?.message + ""}
          ></Inputs>
          
          <Box sx={{display: 'flex', flexDirection: "row"}}>
                      
            <Box sx={{width:'100%',display: 'flex', flexDirection: "column"}}>
              <Typography sx={{ marginY: 1, fontWeight: 'bold', color: "white", fontSize:14}}>
                Precio
              </Typography>
              <Inputs
                type="number"
                sx={{ width: "95%", height: 36, marginRight:"10px"}}
                placeholder="  Dolares"
              />
            </Box>

            <Box sx={{width:'100%',display: 'flex', flexDirection: "column"}}>
              <Typography sx={{ marginY: 1, fontWeight: 'bold', color: "white", fontSize:14, marginLeft:'8%'}}>
                Cuota
              </Typography>
              <Inputs
                type="number"
                sx={{ width: "95%", height: 36, marginRight:"10px" }}
                placeholder=" Ej. 80"
                {...fields.quotas}
                error={!!errors?.quotas}
                helperText={errors?.quotas?.message + ""}
              />
            </Box>
                          
            <Box sx={{width:'100%',display: 'flex', flexDirection: "column"}}>
              <Typography sx={{ marginY: 1, fontWeight: 'bold', color: "white", fontSize:14, marginLeft:'8%'}}>
                  Jugadores
              </Typography>
              <Inputs
                type="number"
                sx={{ width: "100%", height: 36}}
                placeholder="  Ej. 1"
                {...fields.teamSpace}
                error={!!errors?.teamSpace}
                helperText={errors?.teamSpace?.message + ""}
              />
            </Box>    
          </Box>

          <Inputs
            type="Date"
            sx={{ width: "100%", height: 60 }}
            {...fields.startDate}
            error={!!errors?.startDate}
            helperText={errors?.startDate?.message + ""}
          ></Inputs>

          <Inputs
            type="Date"
            sx={{ width: "100%", height: 60 }}
            {...fields.endDate}
            error={!!errors?.endDate}
            helperText={errors?.endDate?.message + ""}
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
              Crear
            </Buttons>
          </Box>
        </Formlarge>

    ),
  };
}

export default useCreateTorneo