import axios from "axios"

export const BASE_URL = "https://0d8dt44d-8080.asse.devtunnels.ms/"

export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "ngrok-skip-browser-warning": true,
  },
})
