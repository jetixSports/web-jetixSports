// lib/api.ts
import axios from 'axios'

// Creamos una instancia con la URL base de tu API
const api = axios.create({
  baseURL: process.env.API_URL,       // http://localhost:3001/api
  timeout: 5000,                       // 5 segundos de espera antes de fallar
  headers: { 'Content-Type': 'application/json' }
})

export default api