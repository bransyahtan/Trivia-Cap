import axios from "axios"

export const BASE_URL = "http://192.168.18.188:8080"


export const API = axios.create({baseURL: BASE_URL, headers: {
    'ngrok-skip-browser-warning': true
}})