"use client"
import { Box, Typography, MenuItem, Select, Stack, InputLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import Inputs from "../../components/UX/Inputs/Inputs";
import Buttons from "../../components/UX/Buttons/Buttons";
import { SetStateAction, useState } from "react";
import useFetch from "../../hooks/useFetch";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import Form from "../../components/UX/Form/Form";
import useMethod from "../../MethodPay/useMethod";

function useCreateTorneo({ callback }: { callback?: () => any }) {
  const { post } = useFetch()
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [status, setStatus] = useState(true)
  const { data: session, } = useSession();
  const user = session?.user;
  const {methods, error} = useMethod()
  const juegosOptions = [
    { value: 'Valorant', label: 'Valorant' },
    { value: 'League of Legends', label: 'League of Legends' },
    { value: 'FIFA', label: 'FIFA' },
    { value: 'Pokemon', label: 'Pokemon' },
    { value: 'Caida', label: 'Caida' },
    { value: 'Fútbol ', label: 'Fútbol ' },
    { value: 'Voleibol', label: 'Voleibol' },
    { value: 'Béisbol', label: 'Béisbol' },
  ]
  const [paymentType, setPaymentType] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');

  const handlePaymentTypeChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setPaymentType(event.target.value);
    setSelectedMethod('');
  };
const fields = {
    name: register("name", { required: "El nombre es obligatorio" }),
    description: register("description", { required: "la descripción es obligatoria" }),
    typeSport: register("typeSport", { required: "El Juego es obligatoria" }),
    quotas: register("quotas", { required: "la campo obligatorio" }),
    amount: register("amount", { required: "la precio de inscripcion es obligatorio" }),
    teamSpace: register("teamSpace", { required: "la descripción es obligatoria" }),
    startDate: register("startDate", { required: "la fecha es obligatoria" }),
    endDate: register("endDate", { required: "la fecha es obligatoria" }),
    paymentsDetails: register("paymentsDetails", { required: "los detalles de pago es obligatorio" }),
    file: register("file", { required: "La imagen es obligatoria" })
  }
  const handleMethodChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedMethod(event.target.value);
    const selected = methods.find(m => m._id === event.target.value);
    if(fields.paymentsDetails?.onChange)
      fields.paymentsDetails?.onChange(event)
    console.log("Método seleccionado:", selected);
  };

  
  const onSubmit = async (data: {paymentsDetails:string, name: string, description: string,amount:string, typeSport: string, quotas: number, teamSpace: number, startDate: Date, endDate: Date, file: any }) => {
    if (!status)
      return
    try {
      setStatus(false)
      const {paymentsDetails,...dataForm}=data
      const formData = new FormData();
      Object.entries(dataForm).forEach(([key, value]) => {
        const newValue = key == "file" ? value[0] : value
        formData.append(key, newValue)
      })
      formData.append("_idPayDetails[0]",paymentsDetails)     
      formData.append("_idReferee", user?._id ?? "")
      const creatTorneo = await post(process.env.NEXT_PUBLIC_HOST_SERVICE + '/tournaments/', formData, true)
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
          Crear un Torneo
        </Typography>

        <Typography sx={{ color: "white" }}>Nombre del Torneo</Typography>
        <Inputs
          sx={{ width: "100%", height: 36 }}
          {...fields.name}
          error={!!errors?.name}
          helperText={errors?.name?.message + ""}
        ></Inputs>

        <Typography sx={{ marginY: 1, color: "white" }}>
          Selecciona el Juego
        </Typography>
        <Select
          sx={{
            width: "100%", marginTop: '4px', height: 36, backgroundColor: '#20105B',
            borderRadius: "10px", color: 'white'
          }}
          {...fields.typeSport}
          error={!!errors?.typeSport}

        >
          <MenuItem value="">Seleccione un juego</MenuItem>
          {juegosOptions.map((option) => (
            <MenuItem key={option.value} value={option.value} >
              {option.label}
            </MenuItem>
          ))}

        </Select>
        <Typography sx={{ marginY: 1, color: "white" }}>
          {errors?.typeSport && errors?.typeSport?.message + ""}
        </Typography>

        <Typography sx={{ color: "white" }}>Detalles del torneo</Typography>
        <Inputs
          multiline
          rows={3}
          sx={{ width: "100%", height: 80, }}
          {...fields.description}
          error={!!errors?.description}
          helperText={errors?.description?.message + ""}
        ></Inputs>

        <Typography sx={{ marginY: 1, color: "white" }}>
          Precio de Inscripcion
        </Typography>
        <Inputs
        {...fields.amount}
          type="number"
          placeholder="  Dolares"
        />
        <Box sx={{ display: 'flex', flexDirection: "row" }}>


          <Box sx={{ width: '98%', display: 'flex', flexDirection: "column" }}>
            <Typography sx={{ marginY: 1, color: "white", marginLeft: '6%' }}>
              Cuota de jugadores
            </Typography>
            <Inputs
              type="number"
              sx={{ width: "95%", height: 36, marginRight: "10px" }}
              placeholder=" Ej. 80"
              {...fields.quotas}
              error={!!errors?.quotas}
              helperText={errors?.quotas?.message + ""}
            />
          </Box>

          <Box sx={{ width: '100%', display: 'flex', flexDirection: "column" }}>
            <Typography sx={{ marginY: 1,  color: "white",  marginLeft: '5%' }}>
              Jugadores por Equipos
            </Typography>
            <Inputs
              type="number"
              sx={{ width: "100%", height: 36 }}
              placeholder="  Ej. 1"
              {...fields.teamSpace}
              error={!!errors?.teamSpace}
              helperText={errors?.teamSpace?.message + ""}
            />
          </Box>
        </Box>
            <Stack spacing={{ xs: 3, sm: 2 }} useFlexGap>
              <InputLabel id="payment-type-label" sx={{ color: 'white' }}>
                Tipo de Método de Pago
              </InputLabel>
              <Select
                labelId="payment-type-label"
                id="payment-type-select"
                value={paymentType}
                label="Tipo de Método de Pago"
                onChange={handlePaymentTypeChange}
                sx={{
                  width: "100%",
                  paddingX: "10px",
                  marginY: "5px",
                  backgroundColor: "#20105B",
                  borderRadius: "10px",
                  color: "white",
                  height: 36,
                }}
              >
                <MenuItem value="mobile_payment">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography>Pago Móvil</Typography>
                  </Box>
                </MenuItem>
                <MenuItem value="bank_transfer">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography>Transferencia Bancaria</Typography>
                  </Box>
                </MenuItem>
                <MenuItem value="binance">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography>Binance</Typography>
                  </Box>
                </MenuItem>
              </Select>

              <InputLabel id="specific-method-label" sx={{ color: 'white' }}>
                Método de Pago
              </InputLabel>
              <Select
                labelId="specific-method-label"
                id="specific-method-select"
                value={selectedMethod}
                label="Método de Pago"
                disabled={!paymentType}
                {...fields.paymentsDetails}
                onChange={handleMethodChange}
                renderValue={(selected) => {
                    const method = methods.find(m => m._id === selected);
                    if (!method) return null;
                    
                    if (method.typePay === 'mobile_payment') {
                      return `Pago Móvil: ${method.details.phoneNumber}`;
                    }
                    if (method.typePay === 'bank_transfer') {
                      return `Transferencia: ${method.details.bankNumber}`;
                    }
                    if (method.typePay === 'binance') {
                      return `Binance: ${method.details.email}`;
                    }
                    return selected;
                  }}
                sx={{
                  width: "100%",
                  paddingX: "10px",
                  marginY: "5px",
                  backgroundColor: "#20105B",
                  borderRadius: "10px",
                  color: "white",
                  height: 36,
                }}
              >
                {methods.filter(method => method.typePay === paymentType).map((method) => (
                    <MenuItem key={method._id} value={method._id}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {method.typePay === 'mobile_payment' && (
                          <>
                            <Typography><strong>Codigo del Banco: </strong>{method.details.mobileCode}</Typography>                   
                            <Typography><strong>Numero de telefono: </strong>{method.details.phoneNumber}</Typography>
                            <Typography><strong>Cedula: </strong>{method.details.identity}</Typography> 
                          </> 
                        )}
                        {method.typePay === 'bank_transfer' && (
                          <>
                            <Typography><strong>Numero de cuenta: </strong>{method.details.bankNumber}</Typography> 
                            <Typography><strong>Cedula: </strong>{method.details.identity}</Typography> 
                          </>
                        )}
                        {method.typePay === 'binance' && (
                          <>
                            <Typography><strong>Emil: </strong>{method.details.email}</Typography> 
                          </>
                        )}
                      </Box>
                    </MenuItem>
                ))}
              </Select>
        </Stack>
        <Typography sx={{ marginY: 1, color: "white" }}>
          Fecha de Inicio del Torneo
        </Typography>
        <Inputs
          type="Date"
          sx={{ width: "100%", height: 36 }}
          {...fields.startDate}
          error={!!errors?.startDate}
          helperText={errors?.startDate?.message + ""}
        ></Inputs>

        <Typography sx={{ marginY: 1, color: "white" }}>
          Fecha de Finalizacíon del Torneo
        </Typography>
        <Inputs
          type="Date"
          sx={{ width: "100%", height: 36 }}
          {...fields.endDate}
          error={!!errors?.endDate}
          helperText={errors?.endDate?.message + ""}
        ></Inputs>

        <Typography sx={{ color: "white" }}>Foto de la Portada del Torneo</Typography>
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
      </Form>

    ),
  };
}

export default useCreateTorneo
