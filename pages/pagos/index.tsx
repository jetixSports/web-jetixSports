// pages/pagos/index.tsx

import { useState } from 'react'
import styles from '../../styles/Pagos.module.css'

const inscripcionesEjemplo = [
  { id: '1', torneo: 'Valorant Showdown', monto: 10 },
  { id: '2', torneo: 'League Clash',       monto: 15 },
  { id: '3', torneo: 'FIFA 25 Cup',        monto: 8 }
]

export default function PagosPage() {
  const [inscId, setInscId] = useState('')
  const [metodo, setMetodo] = useState('')
  const [emailPago, setEmailPago] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const insc = inscripcionesEjemplo.find(i => i.id === inscId)
    alert(
      `Vas a pagar:\n` +
      `Torneo: ${insc?.torneo}\n` +
      `Monto: $${insc?.monto}\n` +
      `Método: ${metodo}\n` +
      `Email (método): ${emailPago}`
    )
    // Aquí harías POST a tu API de pagos
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gestión de Pagos</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="insc">Selección de inscripción:</label>
        <select
          id="insc"
          value={inscId}
          onChange={e => setInscId(e.target.value)}
          required
        >
          <option value="">-- Elige una inscripción --</option>
          {inscripcionesEjemplo.map(i => (
            <option key={i.id} value={i.id}>
              {i.torneo} – ${i.monto}
            </option>
          ))}
        </select>

        <label htmlFor="metodo">Método de pago:</label>
        <select
          id="metodo"
          value={metodo}
          onChange={e => setMetodo(e.target.value)}
          required
        >
          <option value="">-- Elige un método --</option>
          <option value="paypal">PayPal</option>
          <option value="tarjeta">Tarjeta de Crédito</option>
          <option value="crypto">Crypto</option>
        </select>

        <label htmlFor="emailPago">Email para el pago:</label>
        <input
          type="email"
          id="emailPago"
          value={emailPago}
          onChange={e => setEmailPago(e.target.value)}
          placeholder="tu@proveedor.com"
          required
        />

        <button type="submit" className={styles.btn}>
          Pagar ahora
        </button>
      </form>
    </div>
  )
}