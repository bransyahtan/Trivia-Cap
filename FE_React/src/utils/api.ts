import axios from "axios"

export const BASE_URL = "https://d339-2404-8000-1004-1019-8e5-56d1-4a70-47c6.ngrok-free.app/"


export const API = axios.create({baseURL: BASE_URL, headers: {
    'ngrok-skip-browser-warning': true
}})