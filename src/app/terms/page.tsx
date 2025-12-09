import React from 'react';
import { Box, Typography } from '@mui/material';

const Page = () => {
  return (
   <Box sx={{margin:0, backgroundColor: ' #04082a', width:'100%',height:'auto', marginTop:10}}>
      <Box
      sx={{
        maxWidth: 800,
        margin: '0 auto',
        padding: 4,
        backgroundColor: ' #04082a',
        color:'white',
        minHeight: '100vh'
      }}
    >
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary">
          JETIX SPORTS
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Términos y Condiciones
        </Typography>
      </Box>

      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="body1" paragraph>
          El presente documento establece los términos, condiciones y políticas generales que regirán la inscripción y participación en los torneos de eSports y deportes físicos, a los cuales el usuario pueda acceder en la plataforma Jetix eSport. Asimismo, se incluye el modelo de comisión aplicable y la distribución de premios.
        </Typography>
      </Box>

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom color="primary">
          1. Comisión por Participación
        </Typography>
        <Box sx={{ marginLeft: 2 }}>
          <Typography variant="body1" paragraph>
            <strong>2.1.</strong> La Plataforma retendrá una comisión del 20% del monto total de inscripción del torneo. Esta comisión cubrirá los costos operativos, administrativos y de desarrollo de la Plataforma.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>2.2.</strong> El 80% restante del monto total será designado en su totalidad a la Prize Pool del torneo correspondiente.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ marginBottom: 4}}>
        <Typography variant="h5" component="h3" gutterBottom color="primary">
          2. Distribución de Premios
        </Typography>
        <Typography variant="body1" paragraph>
          Los premios se distribuirán entre los tres primeros lugares de cada torneo de la siguiente manera:
        </Typography>
        <Box sx={{ marginLeft: 2, marginBottom: 2 }}>
          <Typography variant="body1" paragraph>
            • <strong>Primer Lugar:</strong> 50% del Prize Pool.
          </Typography>
          <Typography variant="body1" paragraph>
            • <strong>Segundo Lugar:</strong> 30% del Prize Pool.
          </Typography>
          <Typography variant="body1" paragraph>
            • <strong>Tercer Lugar:</strong> 20% del Prize Pool.
          </Typography>
        </Box>
        
        <Box sx={{ backgroundColor: '#e3f2fd', color:" #04082a" ,padding: 2, borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Ejemplo:
          </Typography>
          <Typography variant="body1" paragraph>
            Si el Prize Pool es de $1,000 USD y los porcentajes son:
          </Typography>
          <Typography variant="body1" paragraph>
            • 1° lugar: 60% → $600 USD.
          </Typography>
          <Typography variant="body1" paragraph>
            • 2° lugar: 30% → $300 USD.
          </Typography>
          <Typography variant="body1" paragraph>
            • 3° lugar: 10% → $100 USD.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom color="primary">
          3. Políticas de Pago de Premios
        </Typography>
        <Box sx={{ marginLeft: 2 }}>
          <Typography variant="body1" paragraph>
            <strong>4.1.</strong> Los premios serán abonados dentro de los 3 días hábiles posteriores a la finalización del torneo, previa verificación de identidad y cumplimiento de las reglas.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>4.2.</strong> Jetix eSports se reserva el derecho de retener premios en caso de sospecha de fraude, incumplimiento de normas o conducta antideportiva.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom color="primary">
          4. Política de Reembolsos
        </Typography>
        <Box sx={{ marginLeft: 2 }}>
          <Typography variant="body1" paragraph>
            <strong>5.1.</strong> En caso de cancelación de un torneo por parte del organizador, la compensación monetaria quedará en manos de dicho organizador. Jetix eSports no se hace responsable por la cancelación imprevista de torneos previamente organizados sin apelación justificable.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>5.2.</strong> Jetix eSports tendrá el derecho de retener, ya sea de forma temporal o definitiva, el pozo de premios, total o parcialmente, siempre que medie justa causa, incluyendo pero no limitado a:
          </Typography>
          <Box sx={{ marginLeft: 2, marginBottom: 2 }}>
            <Typography variant="body1" paragraph>
              • Evidencia razonable de fraude, trampa o manipulación de resultados.
            </Typography>
            <Typography variant="body1" paragraph>
              • Incumplimiento grave de las reglas del torneo.
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            En caso de presentarse esta situación el participante recibirá un comunicado detallado de los cargos, con plazos para presentar una apelación, en un plazo mínimo 72 horas hábiles. La plataforma notificará al participante de la decisión final.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>5.3.</strong> Si el torneo sufre fallas técnicas significativas que obliguen a su cancelación, todos los participantes serán reembolsados de su monto inicial de participación. La plataforma se hará responsable de reembolsar el monto de la comisión pagado por el participante.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom color="primary">
          5. Modificaciones
        </Typography>
        <Typography variant="body1" paragraph>
          Jetix eSports tiene total libertad sobre la actualización de los términos, condiciones y políticas, anteriormente mencionadas, la plataforma se encargará de notificar a los usuarios sobre los cambios hechos, una vez sean aplicados.
        </Typography>
      </Box>

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom color="primary">
          6. Aceptación
        </Typography>
        <Typography variant="body1" paragraph>
          Al inscribirse en un torneo, el Jugador acepta estos términos y las reglas del evento especificadas tanto por el organizador como la empresa designada.
        </Typography>
      </Box>

      <Box sx={{ marginTop: 6, padding: 3, backgroundColor: '#f0f0f0', borderRadius: 1, color:" #04082a"  }}>
        <Typography variant="body2" paragraph>
          <strong>Fecha de entrada en vigor:</strong> 14/06/2025
        </Typography>
        <Typography variant="h6" gutterBottom>
          JETIX SPORTS
        </Typography>
      </Box>
    </Box>
  </Box>
  );
};

export default Page;