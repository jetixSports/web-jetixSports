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
            sx={{ width: "100%" }}
            placeholder="   Correo Electronico"
          ></Inputs>
          <Inputs sx={{ width: "100%" }} placeholder="   Constrasena"></Inputs>
          <Buttons variant="contained" LinkComponent={"a"} href="/">hola</Buttons>
        </Box>
      </Form>
    </Box>
  );
}
