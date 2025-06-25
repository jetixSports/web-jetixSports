// pages/streams/index.tsx

// Importamos los estilos para la vista de streams
import styles from '../../styles/Streams.module.css'

// Componente que muestra Streams Activos
export default function StreamsPage() {
  // Datos de ejemplo para representar posibles streams
  const streamsData = [
    {
      name: 'Torneo Valorant en Vivo',
      description: 'Partida 1: Equipo Alpha vs Equipo Omega'
    },
    {
      name: 'League Clash en Directo',
      description: 'Enfrentamiento: Team Red vs Team Blue'
    }
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Streams Activos</h1>
      <div className={styles.grid}>
        {streamsData.map((stream) => (
          <div key={stream.name} className={styles.card}>
            <h2>{stream.name}</h2>
            <p>{stream.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}