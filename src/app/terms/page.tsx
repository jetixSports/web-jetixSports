'use client'
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const page = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // Referencias para las secciones
  const sectionRefs = {
    terminosUso: useRef<HTMLElement>(null),
    privacidad: useRef<HTMLElement>(null),
    responsabilidad: useRef<HTMLElement>(null),
    propiedadIntelectual: useRef<HTMLElement>(null),
    conductaUsuario: useRef<HTMLElement>(null),
    modificaciones: useRef<HTMLElement>(null),
    contacto: useRef<HTMLElement>(null),
  };

  // Función para desplazarse a una sección
  const scrollToSection = (sectionKey: keyof typeof sectionRefs): void => {
    const section = sectionRefs[sectionKey].current;
    if (section) {
      const offset = 100; // Offset para el header fijo
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: sectionTop - offset,
        behavior: 'smooth'
      });
    }
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  // Manejo del menú móvil
  const toggleMobileMenu = (): void => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Cerrar menú móvil al cambiar tamaño de ventana
  useEffect(() => {
    const handleResize = (): void => {
      if (!isMobile && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, mobileMenuOpen]);

  return (
    <Box sx={{ 
      backgroundColor: '#04082a', 
      minHeight: '100vh',
      color: '#fff',
      py: 4
    }}>
      {/* Header fijo para móviles */}
      {isMobile && (
        <AppBar 
          position="fixed" 
          sx={{ 
            backgroundColor: '#04082a',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={toggleMobileMenu}
              edge="start"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" sx={{ ml: 2, flexGrow: 1}}>
              Términos y Condiciones
            </Typography>
          </Toolbar>
        </AppBar>
      )}
      
      <Container maxWidth="lg" sx={{ pt: isMobile ? 8 : 0 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          align="center" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            mb: 6,
            color: '#fff',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            marginTop:10 
          }}
        >
          Términos y Condiciones
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 4 }}>
          {/* Menú de navegación lateral */}
          <Box sx={{ 
            width: isMobile ? '100%' : '280px',
            flexShrink: 0
          }}>
            <Paper 
              elevation={3} 
              sx={{ 
                backgroundColor: '#0d143f',
                borderRadius: 2,
                position: isMobile && !mobileMenuOpen ? 'relative' : 'sticky',
                top: 100,
                display: isMobile && !mobileMenuOpen ? 'none' : 'block',
                border: '1px solid #20105d'
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  p: 2, 
                  color: '#fff',
                  backgroundColor: '#20105d',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8
                }}
              >
                Contenido
              </Typography>
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemButton 
                    onClick={() => scrollToSection('terminosUso')}
                    sx={{ 
                      '&:hover': { backgroundColor: '#1a1f5a' },
                      borderBottom: '1px solid #20105d'
                    }}
                  >
                    <ListItemText 
                      primary="Términos de Uso" 
                      sx={{ color: '#e0e0ff' }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton 
                    onClick={() => scrollToSection('privacidad')}
                    sx={{ 
                      '&:hover': { backgroundColor: '#1a1f5a' },
                      borderBottom: '1px solid #20105d'
                    }}
                  >
                    <ListItemText 
                      primary="Política de Privacidad" 
                      sx={{ color: '#e0e0ff' }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton 
                    onClick={() => scrollToSection('responsabilidad')}
                    sx={{ 
                      '&:hover': { backgroundColor: '#1a1f5a' },
                      borderBottom: '1px solid #20105d'
                    }}
                  >
                    <ListItemText 
                      primary="Limitación de Responsabilidad" 
                      sx={{ color: '#e0e0ff' }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton 
                    onClick={() => scrollToSection('propiedadIntelectual')}
                    sx={{ 
                      '&:hover': { backgroundColor: '#1a1f5a' },
                      borderBottom: '1px solid #20105d'
                    }}
                  >
                    <ListItemText 
                      primary="Propiedad Intelectual" 
                      sx={{color: '#e0e0ff'}} 
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton 
                    onClick={() => scrollToSection('conductaUsuario')}
                    sx={{ 
                      '&:hover': { backgroundColor: '#1a1f5a' },
                      borderBottom: '1px solid #20105d'
                    }}
                  >
                    <ListItemText 
                      primary="Conducta del Usuario" 
                      sx={{ color: '#e0e0ff' }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton 
                    onClick={() => scrollToSection('modificaciones')}
                    sx={{ 
                      '&:hover': { backgroundColor: '#1a1f5a' },
                      borderBottom: '1px solid #20105d'
                    }}
                  >
                    <ListItemText 
                      primary="Modificaciones" 
                      sx={{ color: '#e0e0ff' }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton 
                    onClick={() => scrollToSection('contacto')}
                    sx={{ 
                      '&:hover': { backgroundColor: '#1a1f5a' }
                    }}
                  >
                    <ListItemText 
                      primary="Contacto" 
                      sx={{ color: '#e0e0ff' }}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Paper>
          </Box>
          
          {/* Contenido principal */}
          <Box sx={{ flexGrow: 1 }}>
            <Paper 
              elevation={3} 
              sx={{ 
                backgroundColor: '#0d143f', 
                p: 4,
                borderRadius: 2,
                border: '1px solid #20105d'
              }}
            >
              {/* Sección 1: Términos de Uso */}
              <Box 
                ref={sectionRefs.terminosUso}
                sx={{ mb: 6, scrollMarginTop: '120px' }}
              >
                <Typography 
                  variant="h4" 
                  gutterBottom
                  sx={{ 
                    color: '#6c8cff',
                    mb: 3,
                    pb: 1,
                    borderBottom: '2px solid #20105d'
                  }}
                >
                  1. Términos de Uso
                </Typography>
                <Typography sx={{ color: '#d0d0f0', mb: 2 }}>
                  Bienvenido a nuestra plataforma de creación y gestión de torneos de videojuegos y deportes físicos. 
                  Al acceder y utilizar nuestros servicios, usted acepta cumplir con los siguientes términos y condiciones. 
                  Si no está de acuerdo con alguna parte de estos términos, le recomendamos que no utilice nuestra plataforma.
                </Typography>
                <Typography sx={{ color: '#d0d0f0', mb: 2 }}>
                  Nuestra plataforma está diseñada para facilitar la creación, organización y participación en torneos 
                  competitivos de diversas disciplinas. Los usuarios pueden ser organizadores, participantes o espectadores, 
                  y cada rol conlleva responsabilidades específicas dentro del ecosistema.
                </Typography>
                <Typography sx={{ color: '#d0d0f0', mb: 2 }}>
                  Para utilizar nuestros servicios, debe tener al menos 16 años de edad o contar con el consentimiento 
                  de sus padres o tutores legales. Los organizadores de torneos son responsables de verificar la edad 
                  de los participantes cuando sea necesario según la normativa aplicable.
                </Typography>
              </Box>
              
              {/* Sección 2: Política de Privacidad */}
              <Box 
                ref={sectionRefs.privacidad}
                sx={{ mb: 6, scrollMarginTop: '120px' }}
              >
                <Typography 
                  variant="h4" 
                  gutterBottom
                  sx={{ 
                    color: '#6c8cff',
                    mb: 3,
                    pb: 1,
                    borderBottom: '2px solid #20105d'
                  }}
                >
                  2. Política de Privacidad
                </Typography>
                <Typography sx={{ color: '#d0d0f0', mb: 2 }}>
                  Valoramos su privacidad y nos comprometemos a proteger sus datos personales. Esta política describe 
                  cómo recopilamos, utilizamos, almacenamos y protegemos la información que usted nos proporciona al 
                  utilizar nuestra plataforma.
                </Typography>
                <Typography sx={{ color: '#d0d0f0', mb: 2 }}>
                  <strong>Información que recopilamos:</strong> Recopilamos información que usted nos proporciona 
                  directamente al registrarse, crear un torneo, participar en competencias o contactarnos para soporte. 
                  Esto puede incluir nombre, dirección de correo electrónico, información de perfil, y detalles de 
                  los torneos organizados o en los que participa.
                </Typography>
                <Typography sx={{ color: '#d0d0f0', mb: 2 }}>
                  <strong>Uso de la información:</strong> Utilizamos su información para proporcionar, mantener y 
                  mejorar nuestros servicios, procesar transacciones, comunicarnos con usted, y personalizar su 
                  experiencia. No vendemos ni alquilamos su información personal a terceros con fines comerciales.
                </Typography>
                <Typography sx={{ color: '#d0d0f0', mb: 2 }}>
                  <strong>Protección de datos:</strong> Implementamos medidas de seguridad técnicas y organizativas 
                  para proteger sus datos contra accesos no autorizados, alteración, divulgación o destrucción. 
                  Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro.
                </Typography>

                {/* EN CASO DE NECESITARSE EN EL FUTURO */}
                {/* <Paper 
                  elevation={1} 
                  sx={{ 
                    backgroundColor: '#20105d',
                    p: 3,
                    mt: 3,
                    borderRadius: 1,
                    borderLeft: '4px solid #6c8cff'
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#a8b4ff', mb: 1 }}>
                    Cookies y tecnologías similares
                  </Typography>
                  <Typography sx={{ color: '#d0d0f0' }}>
                    Utilizamos cookies para mejorar su experiencia, analizar el tráfico del sitio y personalizar 
                    el contenido. Puede gestionar sus preferencias de cookies a través de la configuración de su navegador.
                  </Typography>
                </Paper> */}
              </Box>
              
              {/* Sección 3: Limitación de Responsabilidad */}
              <Box 
                ref={sectionRefs.responsabilidad}
                sx={{ mb: 6, scrollMarginTop: '120px' }}
              >
                <Typography 
                  variant="h4" 
                  gutterBottom
                  sx={{ 
                    color: '#6c8cff',
                    mb: 3,
                    pb: 1,
                    borderBottom: '2px solid #20105d'
                  }}
                >
                  3. Limitación de Responsabilidad
                </Typography>
                <Typography sx={{ color: '#d0d0f0', mb: 2 }}>
                  <strong>Responsabilidad del organizador:</strong> Los organizadores de torneos son responsables 
                  de la gestión y ejecución adecuada de sus eventos, incluyendo la comunicación de reglas, 
                  resolución de disputas, y distribución de premios. No nos hacemos responsables por conflictos 
                  entre organizadores y participantes.
                </Typography>
                <Typography sx={{ color: '#d0d0f0', mb: 2 }}>
                  <strong>Responsabilidad del participante:</strong> Los participantes son responsables de cumplir 
                  con las reglas establecidas por los organizadores, mantener una conducta deportiva, y aceptar 
                  los resultados de las competencias. No nos responsabilizamos por decisiones de arbitraje o 
                  descalificaciones realizadas por organizadores.
                </Typography>
                <Typography sx={{ color: '#d0d0f0', mb: 2 }}>
                  <strong>Exención de responsabilidad por lesiones:</strong> En torneos de deportes físicos, 
                  los participantes asumen los riesgos inherentes a la actividad deportiva. No nos responsabilizamos 
                  por lesiones, daños o perjuicios derivados de la participación en eventos organizados a través 
                  de nuestra plataforma.
                </Typography>
                <Typography sx={{ color: '#d0d0f0', mb: 2 }}>
                  <strong>Disponibilidad del servicio:</strong> Nos esforzamos por mantener la plataforma disponible 
                  24/7, pero no garantizamos su acceso ininterrumpido o libre de errores. No nos responsabilizamos 
                  por pérdidas derivadas de interrupciones del servicio.
                </Typography>
              </Box>
              
              {/* Sección 4: Propiedad Intelectual */}
              <Box 
                ref={sectionRefs.propiedadIntelectual}
                sx={{ mb: 6, scrollMarginTop: '120px' }}
              >
                <Typography 
                  variant="h4" 
                  gutterBottom
                  sx={{ 
                    color: '#6c8cff',
                    mb: 3,
                    pb: 1,
                    borderBottom: '2px solid #20105d'
                  }}
                >
                  4. Propiedad Intelectual
                </Typography>
                <Typography sx={{ color: '#d0d0f0', mb: 2 }}>
                  Todos los derechos de propiedad intelectual relacionados con la plataforma, incluyendo pero no 
                  limitado a software, diseño, logotipos, textos, gráficos y funcionalidades, son propiedad 
                  exclusiva de nuestra empresa o de nuestros licenciantes.
                </Typography>
                <Typography sx={{ color: '#d0d0f0', mb: 2 }}>
                  Los usuarios conservan los derechos sobre el contenido que crean y comparten en la plataforma 
                  (como descripciones de torneos, imágenes de perfil, etc.), pero nos otorgan una licencia 
                  mundial, no exclusiva y gratuita para utilizar, mostrar y distribuir dicho contenido en 
                  relación con nuestros servicios.
                </Typography>
                <Typography sx={{ color: '#d0d0f0' }}>
                  Queda prohibida la reproducción, distribución, modificación o uso comercial de cualquier 
                  elemento de nuestra plataforma sin autorización expresa por escrito.
                </Typography>
              </Box>
              
              {/* Sección 5: Conducta del Usuario */}
              <Box 
                ref={sectionRefs.conductaUsuario}
                sx={{ mb: 6, scrollMarginTop: '120px' }}
              >
                <Typography 
                  variant="h4" 
                  gutterBottom
                  sx={{ 
                    color: '#6c8cff',
                    mb: 3,
                    pb: 1,
                    borderBottom: '2px solid #20105d'
                  }}
                >
                  5. Conducta del Usuario
                </Typography>
                <Typography sx={{ color: '#d0d0f0', mb: 2 }}>
                  Los usuarios se comprometen a utilizar la plataforma de manera responsable, ética y legal. 
                  Queda prohibido:
                </Typography>
                <List sx={{ pl: 2, color: '#d0d0f0', mb: 2 }}>
                  <ListItem sx={{ display: 'list-item', py: 0.5 }}>
                    <Typography component="span" sx={{ color: '#d0d0f0' }}>
                      Publicar contenido ofensivo, discriminatorio, difamatorio o ilegal.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', py: 0.5 }}>
                    <Typography component="span" sx={{ color: '#d0d0f0' }}>
                      Intentar acceder a cuentas de otros usuarios o interferir con el funcionamiento de la plataforma.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', py: 0.5 }}>
                    <Typography component="span" sx={{ color: '#d0d0f0' }}>
                      Organizar torneos que promuevan el odio, la violencia o actividades ilegales.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', py: 0.5 }}>
                    <Typography component="span" sx={{ color: '#d0d0f0' }}>
                      Utilizar la plataforma para actividades comerciales no autorizadas o spam.
                    </Typography>
                  </ListItem>
                </List>
                <Typography sx={{ color: '#d0d0f0' }}>
                  Nos reservamos el derecho de suspender o terminar cuentas que violen estas normas de conducta, 
                  sin previo aviso y a nuestra sola discreción.
                </Typography>
              </Box>
              
              {/* Sección 6: Modificaciones */}
              <Box 
                ref={sectionRefs.modificaciones}
                sx={{ mb: 6, scrollMarginTop: '120px' }}
              >
                <Typography 
                  variant="h4" 
                  gutterBottom
                  sx={{ 
                    color: '#6c8cff',
                    mb: 3,
                    pb: 1,
                    borderBottom: '2px solid #20105d'
                  }}
                >
                  6. Modificaciones
                </Typography>
                <Typography sx={{ color: '#d0d0f0', mb: 2 }}>
                  Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. 
                  Las actualizaciones serán publicadas en esta página con una fecha de revisión actualizada.
                </Typography>
                <Typography sx={{ color: '#d0d0f0', mb: 2 }}>
                  Los cambios entrarán en vigor inmediatamente después de su publicación, salvo que se indique 
                  lo contrario. El uso continuado de la plataforma después de cualquier modificación constituye 
                  la aceptación de los nuevos términos.
                </Typography>
                <Typography sx={{ color: '#d0d0f0' }}>
                  Recomendamos revisar periódicamente esta página para estar informado sobre cualquier cambio. 
                  Para cambios significativos, haremos esfuerzos razonables para notificar a los usuarios a 
                  través de la plataforma o por correo electrónico.
                </Typography>
              </Box>
              
              {/* Sección 7: Contacto */}
              <Box 
                ref={sectionRefs.contacto}
                sx={{ scrollMarginTop: '120px' }}
              >
                <Typography 
                  variant="h4" 
                  gutterBottom
                  sx={{ 
                    color: '#6c8cff',
                    mb: 3,
                    pb: 1,
                    borderBottom: '2px solid #20105d'
                  }}
                >
                  7. Contacto
                </Typography>
                <Typography sx={{ color: '#d0d0f0', mb: 2 }}>
                  Si tiene preguntas, dudas o comentarios sobre estos términos y condiciones o sobre nuestras 
                  políticas de privacidad, no dude en contactarnos:
                </Typography>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    backgroundColor: '#20105d',
                    p: 3,
                    mt: 2,
                    borderRadius: 1
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#a8b4ff', mb: 2 }}>
                    Información de contacto
                  </Typography>
                  <Typography sx={{ color: '#d0d0f0', mb: 1 }}>
                    <strong>Correo electrónico:</strong> legal@torneoscompetitivos.com
                  </Typography>
                  <Typography sx={{ color: '#d0d0f0', mb: 1 }}>
                    <strong>Dirección:</strong> Av. del Deporte 123, Ciudad Digital, CP 28080
                  </Typography>
                  <Typography sx={{ color: '#d0d0f0' }}>
                    <strong>Teléfono:</strong> +34 900 123 456
                  </Typography>
                </Paper>
                <Divider sx={{ my: 4, backgroundColor: '#20105d' }} />
                <Typography 
                  variant="body2" 
                  align="center" 
                  sx={{ 
                    color: '#a0a0d0',
                    fontStyle: 'italic',
                    mt: 4
                  }}
                >
                  Última actualización: {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                </Typography>
              </Box>
            </Paper>
            
            {/* Aviso de aceptación */}
            <Paper 
              elevation={2} 
              sx={{ 
                backgroundColor: '#0d143f',
                p: 3,
                mt: 4,
                borderRadius: 2,
                border: '1px solid #20105d',
                borderLeft: '6px solid #6c8cff'
              }}
            >
              <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
                Confirmación de Aceptación
              </Typography>
              <Typography sx={{ color: '#d0d0f0' }}>
                Al utilizar nuestra plataforma, usted reconoce haber leído, comprendido y aceptado estos 
                términos y condiciones en su totalidad. Si no está de acuerdo con alguna parte de estos términos, 
                le recomendamos que no utilice nuestros servicios.
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default page;