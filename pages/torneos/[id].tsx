// pages/torneos/[id].tsx (parte 1)
import styles from '../../styles/TorneoDetalle.module.css'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import api from '../../lib/api'

type Torneo = {
  id: number
  nombre: string
  fecha: string
  descripcion: string
  estado: 'abierto' | 'cerrado'
}

type Inscrito = {
  id: number
  username: string
  avatarUrl?: string
}

type Props = {
  torneo: Torneo | null
  inscritos: Inscrito[]
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const { id } = ctx.params!            // extrae el ID de la URL
  try {
    // 1. Fetch del torneo
    const { data: torneo } = await api.get<Torneo>(`/torneos/${id}`)
    // 2. Fetch de inscritos
    const { data: inscritos } = await api.get<Inscrito[]>(`/torneos/${id}/inscritos`)
    return { props: { torneo, inscritos } }
  } catch (error) {
    console.error('Error al obtener detalle:', error)
    return { props: { torneo: null, inscritos: [] } }
  }
}
// pages/torneos/[id].tsx (parte 2)
import styles from '../../styles/TorneoDetalle.module.css'

export default function TorneoDetalle({ torneo, inscritos }: Props) {
  if (!torneo) {
    return <p className={styles.error}>⚠️ Torneo no encontrado.</p>
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{torneo.nombre}</h1>
      <p className={styles.meta}>
        📅 {new Date(torneo.fecha).toLocaleDateString()}  •  {torneo.estado === 'abierto' ? '🟢 Abierto' : '🔴 Cerrado'}
      </p>
      <p className={styles.desc}>{torneo.descripcion}</p>

      <section className={styles.inscritos}>
        <h2>Participantes ({inscritos.length})</h2>
        <ul>
          {inscritos.map(u => (
            <li key={u.id} className={styles.user}>
              {u.avatarUrl && <img src={u.avatarUrl} alt={u.username} className={styles.avatar}/>}
              <span>{u.username}</span>
            </li>
          ))}
        </ul>
      </section>

      {torneo.estado === 'abierto' && (
        <Link href={`/inscripciones?torneo=${torneo.id}`}>
          <button className={styles.cta}>Inscribirme</button>
        </Link>
      )}

      <p className={styles.back}>
        ← <Link href="/torneos">Volver a lista</Link>
      </p>
    </div>
  )
}