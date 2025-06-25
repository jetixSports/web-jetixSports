// pages/notificaciones/index.tsx
import styles from '../../styles/Notificaciones.module.css'

export default function NotificacionesPage() {
  const notificaciones = [
    { id: 1, mensaje: 'Torneo Valorant comienza en 1 hora', tipo: 'info' },
    { id: 2, mensaje: 'Tu inscripción al FIFA 25 Cup fue confirmada', tipo: 'success' },
    { id: 3, mensaje: 'Error al procesar tu pago', tipo: 'error' }
  ]

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Notificaciones</h1>
      <ul className={styles.list}>
        {notificaciones.map(n => (
          <li key={n.id} className={styles[n.tipo]}>
            {n.mensaje}
          </li>
        ))}
      </ul>
    </div>
  )
}