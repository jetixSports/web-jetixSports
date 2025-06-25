// pages/configuracion/index.tsx

import { useState } from 'react'
import styles from '../../styles/Configuracion.module.css'

export default function ConfiguracionPage() {
  // Estados de configuración
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [tema, setTema] = useState<'light' | 'dark'>('light')
  const [shareEmail, setShareEmail] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(
      `Guardando configuración:\n` +
      `Notificaciones Email: ${emailNotifs ? 'Activadas' : 'Desactivadas'}\n` +
      `Tema: ${tema}\n` +
      `Compartir Email: ${shareEmail ? 'Sí' : 'No'}`
    )
    // Aquí llamarías a tu API para persistir la configuración
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Configuración de Usuario</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Notificaciones */}
        <div className={styles.field}>
          <label>
            <input
              type="checkbox"
              checked={emailNotifs}
              onChange={e => setEmailNotifs(e.target.checked)}
            />
            Recibir notificaciones por Email
          </label>
        </div>

        {/* Tema */}
        <div className={styles.field}>
          <p>Tema de la interfaz:</p>
          <label>
            <input
              type="radio"
              name="tema"
              value="light"
              checked={tema === 'light'}
              onChange={() => setTema('light')}
            />
            Claro
          </label>
          <label>
            <input
              type="radio"
              name="tema"
              value="dark"
              checked={tema === 'dark'}
              onChange={() => setTema('dark')}
            />
            Oscuro
          </label>
        </div>

        {/* Privacidad */}
        <div className={styles.field}>
          <label>
            <input
              type="checkbox"
              checked={shareEmail}
              onChange={e => setShareEmail(e.target.checked)}
            />
            Compartir mi email públicamente
          </label>
        </div>

        <button type="submit" className={styles.btn}>
          Guardar Cambios
        </button>
      </form>
    </div>
  )
}