"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Form from "../../components/UX/Form/Form";
import Inputs from "../../components/UX/Inputs/Inputs";
import Buttons from "../../components/UX/Buttons/Buttons";
import Background from "../../components/UX/Background/Background";
import useLogin from "./useLogin";
import { useSession } from "next-auth/react";
import PasswordInputs from "../../components/UX/Inputs/InputsPassword";


export default function App() {
   const { data: session } = useSession();
  const user = session?.user;
  console.log(user);
  
  const { handleSubmit, fields, errors,status } = useLogin()
  return (
    <Box sx={{ width: '100%', marginTop:"190px" }}>
      <Background src="./backgrounds/login.svg"></Background>
      <Form styles={{ Box: { marginX: 'auto', marginY: 10 }, form: { width: '100%' } }} handleSubmit={handleSubmit}>
        <Typography sx={{ marginY: 1, fontWeight: 'bold', color: "white", textAlign: "center", fontSize: 24 }}>
          Inicio de Sesion
        </Typography>
        <Box sx={{ width: "100%", gap: 2, display: 'flex', flexDirection: "column" }}>
          <Inputs
            type="email"
            sx={{ width: "100%", height: 36 }}
            placeholder="   Correo Electronico"
            {...fields.email}
            error={!!errors?.email}
            helperText={errors?.email?.message+""}
          ></Inputs>
          <PasswordInputs type="password" sx={{ width: "100%", }} placeholder="   Constraseña" {...fields.password}
           error={!!errors?.password}
            helperText={errors?.password?.message+""}></PasswordInputs>
          <Buttons disabled={!status} type="submit" sx={{ marginTop: "5px" }} variant="contained">Iniciar Sesion</Buttons>
        </Box>
        <Box sx={{ width: "100%", display: 'flex', justifyContent: 'center', gap: 2, marginY: 1 }}>
          <Typography sx={{ marginY: '5px', color: "white", textAlign: "center", fontSize: 16 }}>
            ¿No tienes cuenta?
          </Typography>
          <Buttons sx={{ backgroundColor: 'transparent' }} LinkComponent={"a"} href="/sign-up">Registrate</Buttons>
        </Box>
      </Form>
    </Box>
  );
}
