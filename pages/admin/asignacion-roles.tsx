// pages/admin/asignacion-roles.tsx
import styles from '../../styles/AsignacionRoles.module.css'

const users = [
  { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', rol: 'jugador' },
  { id: 2, nombre: 'Ana Torres', email: 'ana@example.com', rol: 'organizador' },
  { id: 3, nombre: 'Carlos Ruiz', email: 'carlos@example.com', rol: 'admin' }
]

export default function AsignacionRoles() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Asignación de Roles</h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol Actual</th>
            <th>Cambiar Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.rol}</td>
              <td>
                <select defaultValue={usuario.rol} className={styles.select}>
                  <option value="jugador">Jugador</option>
                  <option value="organizador">Organizador</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}