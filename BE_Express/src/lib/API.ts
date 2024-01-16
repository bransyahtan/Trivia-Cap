import axios from "axios";

export const API = axios.create({
  baseURL: "http://192.168.18.188:8080/api/v1",
});
