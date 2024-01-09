import axios from "axios"

export const BASE_URL = "https://9bd1-2404-8000-1004-1019-49b0-6036-c81c-1e2.ngrok-free.app"


export const API = axios.create({baseURL: BASE_URL})