"use client";
import * as React from 'react';
import {Box, Typography, FormControl, Container, Paper, TextField, InputLabel, Select, MenuItem, IconButton} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';

import Background from '../components/UX/Background/Background';
import Buttons from '../components/UX/Buttons/Buttons';
import BoxHeader from '../components/UX/Box/Box';
import Inputs from '../components/UX/Inputs/Inputs';


export default function Contact() {
      const motivos = [
    { value: 'organizador', label: 'Obtener cuenta organizador' },
    { value: 'error', label: 'Reportar error' },
    { value: 'soporte', label: 'Soporte técnico' },
    { value: 'informacion', label: 'Solicitar información' },
    { value: 'colaboracion', label: 'Propuesta de colaboración' },
    { value: 'otros', label: 'Otros' }
    ];

  return (
    <Box>
        <BoxHeader>
            <Background sx={{backgroundColor:"#070c29ff"}} src="./backgrounds/torneo.svg"></Background>
            <Box sx={{color:'white', margin:'220px 0  0 100px'}}>
                <Typography variant="h4" sx={{fontWeight: 'bold',marginBottom:'10px'}}>
                    Contactanos
                </Typography>
                <Typography>Siempre hay una novedad en Jetix Sports,
                     mantente al día con nuestras redes
                    sociales y no pierdas el ritmo.</Typography>
            </Box>
            <Container  sx={{ display: 'flex', gap: 6 }}>
                <IconButton aria-label="Facebook" sx={{
                color: 'white',
                '&:hover': { color: '#1877F2', backgroundColor: 'rgba(24, 119, 242, 0.1)' }
                }}
                onClick={() => { window.open('https://www.facebook.com/share/1FSwb2f3o6/', '_blank') }}>
                <FacebookIcon fontSize="large" />
                </IconButton>

                <IconButton aria-label="Twitter" sx={{
                color: 'white',
                '&:hover': { color: '#ffffffff', backgroundColor: 'rgba(3, 9, 14, 1)' }
                }}
                onClick={() => { window.open('https://x.com/JetixSport', '_blank') }}
                >
                <XIcon fontSize="large" />
                </IconButton>

                <IconButton aria-label="WhatsApp" sx={{
                color: 'white',
                '&:hover': { color: '#25D366', backgroundColor: 'rgba(37, 211, 102, 0.1)' }
                }}
                onClick={() => { window.open('https://whatsapp.com/channel/0029VbANtekEgGfEAaZPvG02', '_blank') }}
                >
                <WhatsAppIcon fontSize="large" />
                </IconButton>

                <IconButton aria-label="Instagram" sx={{
                color: 'white',
                '&:hover': {
                    background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
                    color: 'white'
                }
                }}
                onClick={() => { window.open('https://www.instagram.com/jetixsport/?igsh=MW9wZjh2ZmVhaHByNg%3D%3D#', '_blank') }}
                >
                <InstagramIcon fontSize="large" />
                </IconButton>
            </Container>
        </BoxHeader>
        
        <Box sx={{marginTop:'50px', display:'flex',justifyContent:'center', backgroundColor:'#04082a', flexDirection:'column',textAlign:'center'}}>
            <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 3, md: 5 },
          backgroundColor: "#070735",
          border: "solid #432686ff 1px",
          borderRadius: "14px",
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color:'white' }}>
            Formulario de Contacto
          </Typography>
          <Typography variant="body1" color="#a3a3a3ff">
            Complete el siguiente formulario y nos pondremos en contacto a la brevedad
          </Typography>
        </Box>

        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}
        >

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
            <Box sx={{ flex: 1 }}>
              <Inputs
                fullWidth
                placeholder='Nombre'
                name="nombre"
              />
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <Inputs
                fullWidth
                placeholder='Apellido'
                name="apellido"
              />
            </Box>
          </Box>

          <Box sx={{display:'flex', justifyContent:'space-between'}}>
            <Box sx={{width:'50%',marginRight:2}}>
                <Inputs
                fullWidth
                placeholder="Correo electrónico"
                name="correo"
                type="email"
                />
            </Box>
            <FormControl sx={{width:'90%'}}>
            <InputLabel id="Select-label" sx={{color:'#9293b6', alignContent:'center'}}>Motivo de contacto</InputLabel>
              <Select
                sx={{
                    width: "100%",
                    paddingX: "10px",
                    marginY: "5px",
                    backgroundColor: "rgb(32 34 103)",
                    borderRadius: "10px",
                    color: "white",
                    height: 36,
                }}
                name="motivo"
                labelId='Select-label'
                label='Motivo de Contacto'
                displayEmpty
              >
                <MenuItem value="" disabled>
                    <em>Seleccione un motivo</em>
                </MenuItem>
                {motivos.map((motivo) => (
                  <MenuItem key={motivo.value} value={motivo.value}>
                    {motivo.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
          </Box>

          <Box>
            <Inputs
              fullWidth
              name="mensaje"
              multiline
              rows={6}
              placeholder="Escriba su mensaje aquí..."
              sx={{
                height:"150px",
                '& .MuiOutlinedInput-root': {
                  alignItems: 'flex-start'
                }
              }}
            />
          </Box>

          {/* Botón de envío */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Buttons
              type="submit"
              variant="contained"
              size="large"
              endIcon={<SendIcon />}
              sx={{
                py: 1.5,
                px: 6,
                fontSize: '1.1rem',
              }}
            >
              Enviar Mensaje
            </Buttons>
          </Box>
        </Box>

        {/* Información adicional */}
        <Box sx={{ mt: 5, pt: 3, borderTop: '1px solid #e0e0e0' }}>
          <Typography variant="body2" color="#a3a3a3ff" align="center">
            Los datos proporcionados serán utilizados exclusivamente para responder a su consulta.
            Nos comprometemos a no compartir su información con terceros.
          </Typography>
        </Box>
      </Paper>
    </Container>
        </Box>
    </Box>
  )
}
