"use client";
import React, { useState } from "react";
import { Box, Typography, Link, List, ListItem, ListItemText, ListItemAvatar, Avatar } from "@mui/material";
import '@fontsource/bebas-neue';
import '@fontsource/inter';
import '@fontsource/nunito';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import CheckIcon from '@mui/icons-material/Check';

import Form from "../../components/UX/Form/Form";
import Inputs from "../../components/UX/Inputs/Inputs";
import Checkboxes from "../../components/UX/Inputs/Checkbox";
import Buttons from "../../components/UX/Buttons/Buttons";
import Background from "../../components/UX/Background/Background";
import PasswordInputs from "../../components/UX/Inputs/InputsPassword";
import useSignUp from "../sign-up/useSignUp";
import { useSession } from "next-auth/react";

export default function App() {
  const [acceptTerms, setAcceptTerms] = useState(false)
  const { handleSubmit, fields, errors, status } = useSignUp(acceptTerms)
  
  return (
    <Box sx={{ width: '100%', display: "flex", alignContent:'space-between', backgroundColor:'#04082a'
    }}>

      <Box sx={{display:"flex",justifyContent:'center', width:'50%',marginTop:15, marginBottom:10, marginLeft:'10%'}} >
        <Form styles={{ form: { width: '100%' } }} handleSubmit={handleSubmit}>
          <Box sx={{ width: "100%", gap: 2, display: 'flex', flexDirection: "column" }}>

            <Inputs sx={{ width: "100%", height: 36 }} placeholder="   Nombre" {...fields.name}
              error={!!errors?.name}
              helperText={errors?.name?.message + ""} />

            <Inputs sx={{ width: "100%", height: 36 }} placeholder="   Apellido" {...fields.lastname}
              error={!!errors?.lastname}
              helperText={errors?.lastname?.message + ""} />

            <Inputs sx={{ width: "100%", height: 36 }} placeholder="   Nombre de usuario" {...fields.nameUser}
              error={!!errors?.nameUser}
              helperText={errors?.nameUser?.message + ""} />

            <Inputs sx={{ width: "100%", height: 36 }} placeholder="   Correo Electronico" {...fields.email}
              error={!!errors?.email}
              helperText={errors?.email?.message + ""} />

            <PasswordInputs type="password" sx={{ width: "100%" }} placeholder="   Contraseña" {...fields.password}
              error={!!errors?.password}
              helperText={errors?.password?.message + ""} />

            <PasswordInputs type="password" sx={{ width: "100%" }} placeholder="   Confirmar Contraseña" {...fields.passwordSecond}
              error={!!errors?.passwordSecond}
              helperText={errors?.passwordSecond?.message + ""} />

            <Box sx={{ width: "100%", display: 'flex', flexDirection: "row", alignItems: "center" }}>
              <Checkboxes checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
              <Typography sx={{ display: "flex", fontSize: "15px", marginBottom: "0", marginRight: "5px", color: "white" }} variant="body2" gutterBottom> Aceptas los</Typography>
              <Link href="/terms" sx={{ fontSize: "15px" }} underline="hover" variant="body2"> {'Terminos y Condiciones'}</Link>
            </Box>
            <Buttons disabled={!status} type="submit" sx={{ marginTop: "5px" }} variant="contained">Registrar</Buttons>
          </Box>
          <Box sx={{ width: "100%", display: 'flex', justifyContent: 'center', gap: 2, marginY: 1 }}>
            <Typography sx={{ marginY: '5px', color: "white", textAlign: "center", fontSize: 16 }}>
              ¿Ya tienes cuenta?
            </Typography>
            <Buttons sx={{ backgroundColor: 'transparent' }} LinkComponent={"a"} href="/login">Inicia Sesion</Buttons>
          </Box>
        </Form>
      </Box>

      <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center', alignItems:'center', width:'50%',marginBottom:4, marginRight:'12%', marginLeft:'7%'}}>
        <Typography variant="h1" sx={{fontSize:'60px',fontFamily:"Bebas Neue",color:'white'}}>
          ¡Únete a la acción!
        </Typography>
        <Typography sx={{fontSize:'16px',fontFamily:"Nunito",color:'white', textAlign:'justify'}}>
          Registrate y comienza a competir en los torneos que más te gustan.  Al crear tu cuenta podras:
        </Typography>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{backgroundColor:'#9c27b0'}}>
                    <CheckIcon sx={{color:'white'}} />
                  </Avatar>
                </ListItemAvatar>
                  <ListItemText>
                    <Typography  sx={{fontSize:'16px',fontFamily:"Nunito",color:'white'}}>
                      Inscribirte en torneos de tus videojuegos favoritos, tanto online como presenciales.
                    </Typography>
                  </ListItemText>              
                </ListItem>
               <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <CheckIcon color="secondary" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>
                  <Typography  sx={{fontSize:'16px',fontFamily:"Nunito",color:'white'}}>
                    Formar equipos y conquista la victoria.
                  </Typography>
                </ListItemText>
              </ListItem>
               <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <CheckIcon color="secondary"/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>
                  <Typography  sx={{fontSize:'16px',fontFamily:"Nunito",color:'white'}}>
                    Acceder a los streaming para ver torneos de interes.
                  </Typography>
                </ListItemText>
               </ListItem>
            </List>
      </Box>
    </Box>

  );
}0
