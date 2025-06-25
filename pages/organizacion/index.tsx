// pages/organizacion/index.tsx
import { useState } from 'react'
import styles from '../../styles/Organizacion.module.css'

export default function OrganizacionPage() {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fecha, setFecha] = useState('')
  const [juego, setJuego] = useState('')
  const [premio, setPremio] = useState('')
  const [maxParticipantes, setMaxParticipantes] = useState(16)
  const [tipo, setTipo] = useState('5v5')
  const [banner, setBanner] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí normalmente construirías un FormData y harías fetch/axios a tu API
    const info = `
      Nombre: ${nombre}
      Descripción: ${descripcion}
      Fecha: ${fecha}
      Juego: ${juego}
      Premio: ${premio}
      Max. Participantes: ${maxParticipantes}
      Tipo: ${tipo}
      Banner: ${banner?.name || 'No seleccionado'}
    `
    alert('Torneo creado con datos:\n' + info)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Organizar Torneo</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Nombre del Torneo:</label>
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          placeholder="Ej. Valorant Championship"
          required
        />

        <label>Descripción:</label>
        <textarea
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          placeholder="Detalles del torneo, reglas, formato..."
          required
        />

        <label>Fecha y Hora:</label>
        <input
          type="datetime-local"
          value={fecha}
          onChange={e => setFecha(e.target.value)}
          required
        />

        <label>Juego:</label>
        <input
          type="text"
          value={juego}
          onChange={e => setJuego(e.target.value)}
          placeholder="Ej. League of Legends"
          required
        />

        <label>Premio:</label>
        <input
          type="text"
          value={premio}
          onChange={e => setPremio(e.target.value)}
          placeholder="Ej. $1000 + trofeo"
          required
        />

        <label>Max. Participantes:</label>
        <input
          type="number"
          value={maxParticipantes}
          onChange={e => setMaxParticipantes(Number(e.target.value))}
          min={2}
          required
        />

        <label>Tipo de Torneo:</label>
        <select value={tipo} onChange={e => setTipo(e.target.value)}>
          <option value="1v1">1v1</option>
          <option value="5v5">5v5</option>
          <option value="4v4">4v4</option>
        </select>

        <label>Banner del Torneo:</label>
        <input
          type="file"
          accept="image/*"
          onChange={e => setBanner(e.target.files?.[0] || null)}
        />

        <button type="submit" className={styles.btn}>
          Crear Torneo
        </button>
      </form>
    </div>
  )
}