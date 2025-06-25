// pages/perfil/index.tsx

import styles from '../../styles/Perfil.module.css'

export default function PerfilPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Perfil de Usuario</h1>
      <div className={styles.profileCard}>
        <img
          className={styles.avatar}
          src="/avatar-placeholder.png"
          alt="Avatar"
        />
        <div className={styles.info}>
          <h2>victor acosta</h2>
          <p>Email: acostavictor920@gmail.com</p>
          <p>Rol: Jugador</p>
        </div>
      </div>
      <button className={styles.btnEdit}>Editar Perfil</button>
    </div>
  )
}