"use client";
import React from "react";
import { Box, Typography, Link } from "@mui/material";
import Form from "../../components/UX/Form/Form";
import Inputs from "../../components/UX/Inputs/Inputs";
import Checkboxes from "../../components/UX/Inputs/Checkbox";
import Buttons from "../../components/UX/Buttons/Buttons";
import Background from "../../components/UX/Background/Background";
import PasswordInputs from "../../components/UX/Inputs/InputsPassword";
import useSignUp from "../sign-up/useSignUp";

export default function App() {

    //const { data: session } = useSession();
    //const user = session?.user;
    //console.log(user);
    
    const { handleSubmit, fields, errors,status } = useSignUp()

  return (
    <Box sx={{ width: '100%', display:"flex", justifyContent: "center", marginTop:"160px"}}>
      <Background src="./backgrounds/login.svg"/>

      <Box>
        <Form styles={{form:{width:'100%'}}} handleSubmit={handleSubmit}>
          <Typography sx={{marginY:1,fontWeight:'bold', color: "white", textAlign: "center", fontSize: 24 }}>
            Registro
          </Typography>
          <Box sx={{ width: "100%", gap: 2,display:'flex',flexDirection:"column"}}>

            <Inputs sx={{ width: "100%",height:36 }} placeholder="   Nombre"/>
            <Inputs sx={{ width: "100%",height:36 }} placeholder="   Apellido"/>
            <Inputs sx={{ width: "100%",height:36 }} placeholder="   Nombre de usuario"/>
            <Inputs sx={{ width: "100%",height:36 }} placeholder="   Correo Electronico"/>
            <PasswordInputs type="password" sx={{ width: "100%" }} placeholder="   Contraseña" />
            <PasswordInputs type="password" sx={{ width: "100%" }} placeholder="   Confirmar Contraseña"/>
            <Box sx={{ width: "100%",display:'flex',flexDirection:"row", alignItems:"center"}}>
              <Checkboxes/> 
              <Typography sx={{display:"flex", fontSize:"15px", marginBottom:"0", marginRight:"5px", color:"white"}} variant="body2" gutterBottom> Aceptas los</Typography>
              <Link href="#" sx={{ fontSize:"15px"}} underline="hover" variant="body2"> {'Terminos y Condiciones'}</Link>
            </Box>
            <Buttons sx={{marginTop: "5px"}} variant="contained" LinkComponent={"a"} href="/sign-up">Registrar</Buttons>
          </Box>
          <Box sx={{ width: "100%",display:'flex', justifyContent:'center', gap:2, marginY:1}}>
            <Typography sx={{marginY:'5px', color: "white", textAlign: "center", fontSize: 16 }}>
            ¿Ya tienes cuenta?
            </Typography>
            <Buttons sx={{backgroundColor:'transparent'}} LinkComponent={"a"} href="/login">Inicia Sesion</Buttons>            
          </Box>
        </Form>
      </Box>
    </Box>
    
  );
}
