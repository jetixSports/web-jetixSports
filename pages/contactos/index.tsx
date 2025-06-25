// pages/contactos/index.tsx

import styles from '../../styles/Contactos.module.css'

export default function ContactosPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contáctanos</h1>
      <form className={styles.form}>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" placeholder="Tu nombre" />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder="tu@email.com" />

        <label htmlFor="mensaje">Mensaje:</label>
        <textarea id="mensaje" placeholder="Escribe tu mensaje aquí"></textarea>

        <button type="submit" className={styles.btn}>Enviar</button>
      </form>
    </div>
  )
}