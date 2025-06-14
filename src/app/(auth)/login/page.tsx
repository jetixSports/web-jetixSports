"use client";
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Form from "../../components/UX/Form/Form";
import Inputs from "../../components/UX/Inputs/Inputs";
import Buttons from "../../components/UX/Buttons/Buttons";

export default function App() {
  return (
    <Box>
      <Form styles={{form:{width:'100%'}}}>
        <Typography sx={{marginY:1,fontWeight:'bold', color: "white", textAlign: "center", fontSize: 24 }}>
          Inicio de Sesion
        </Typography>
        <Box sx={{ width: "100%", gap: 2,display:'flex',flexDirection:"column"}}>
          <Inputs
            sx={{ width: "100%",height:36 }}
            placeholder="   Correo Electronico"
          ></Inputs>
          <Inputs sx={{ width: "100%",}} placeholder="   Constraseña"></Inputs>
          <Buttons sx={{marginTop: "5px"}} variant="contained" LinkComponent={"a"} href="/">Iniciar Sesion</Buttons>
        </Box>
        <Box sx={{ width: "100%",display:'flex', justifyContent:'center', gap:2, marginY:1}}>
          <Typography sx={{marginY:'5px', color: "white", textAlign: "center", fontSize: 16 }}>
          ¿No tienes cuenta?
        </Typography>
         <Buttons sx={{backgroundColor:'transparent'}} LinkComponent={"a"} href="/signIn">Registrate</Buttons>
        </Box>
      </Form>
    </Box>
  );
}
