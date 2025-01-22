import axios from "axios";

export const myAxios = axios.create({
    baseURL: "http://localhost:3000",
    // baseURL: "https://todo.wirawan.my.id",
    withCredentials: true,
});
