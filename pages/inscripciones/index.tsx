// pages/inscripciones/index.tsx

// pages/inscripciones/index.tsx
import { useState } from 'react'
import styles from '../../styles/Inscripciones.module.css'

const torneosEjemplo = [
  { id: '1', nombre: 'Valorant Showdown' },
  { id: '2', nombre: 'League Clash' },
  { id: '3', nombre: 'FIFA 25 Cup' }
]

export default function InscripcionesPage() {
  const [torneoId, setTorneoId] = useState('')
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Inscrito a torneo ${torneoId}\nNombre: ${nombre}\nEmail: ${email}`)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Inscripción a Torneos</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="torneo">Selecciona un torneo:</label>
        <select
          id="torneo"
          value={torneoId}
          onChange={e => setTorneoId(e.target.value)}
          required
        >
          <option value="">-- Elige un torneo --</option>
          {torneosEjemplo.map(t => (
            <option key={t.id} value={t.id}>
              {t.nombre}
            </option>
          ))}
        </select>

        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          placeholder="Tu nombre completo"
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="tu@correo.com"
          required
        />

        <button type="submit" className={styles.btn}>
          Inscribirme
        </button>
      </form>
    </div>
  )
}
