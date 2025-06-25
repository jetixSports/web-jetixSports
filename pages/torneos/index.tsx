// pages/torneos/index.tsx

import { GetServerSideProps } from 'next'
import api from '../../lib/api'            // ← tu instancia Axios
import styles from '../../styles/Torneos.module.css'

// 1) Definimos la forma de un torneo según tu backend
type Torneo = {
  id: number
  nombre: string
  fecha: string               // ISO date string
  estado: 'abierto' | 'cerrado'
}

// 2) Props que recibirá tu componente
type Props = {
  torneos: Torneo[]
}

// 3) Componente React que recibe la lista de torneos
export default function TorneosPage({ torneos }: Props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Torneos</h1>

      {torneos.length === 0 ? (
        <p className={styles.empty}>No hay torneos disponibles.</p>
      ) : (
        <ul className={styles.list}>
          {torneos.map(t => (
            <li key={t.id} className={styles.card}>
              <h2>{t.nombre}</h2>
              <p>Fecha: {new Date(t.fecha).toLocaleDateString()}</p>
              <span className={
                t.estado === 'abierto' ? styles.open : styles.closed
              }>
                {t.estado === 'abierto' ? '🟢 Abierto' : '🔴 Cerrado'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// 4) Esta función corre en el servidor en cada petición
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    // Llamamos a GET /api/torneos de tu backend
    const { data: torneos } = await api.get<Torneo[]>('/torneos')

    // Pasamos la data a tu componente
    return { props: { torneos } }
  } catch (error) {
    console.error('Error al obtener torneos:', error)
    // Si falla, mostramos lista vacía
    return { props: { torneos: [] } }
  }
}