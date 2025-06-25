// components/Layout.tsx
import Link from 'next/link'
import styles from '../styles/Layout.module.css'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            JETIX SPORT
          </Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/torneos" className={styles.navLink}>
            🏆 Torneos
          </Link>
          <Link href="/streams" className={styles.navLink}>
            📺 Streams
          </Link>
          <Link href="/inscripciones" className={styles.navLink}>
            ✍️ Inscripciones
          </Link>
          <Link href="/pagos" className={styles.navLink}>
            💳 Pagos
          </Link>
          <Link href="/contactos" className={styles.navLink}>
            ✉️ Contacto
          </Link>
          <Link href="/perfil" className={styles.navLink}>
            👤 Perfil
          </Link>
          <Link href="/configuracion" className={styles.navLink}>
            ⚙️ Configuración
          </Link>
        </nav>
      </header>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} JETIX SPORT. Todos los derechos reservados.
      </footer>
    </div>
  )
}