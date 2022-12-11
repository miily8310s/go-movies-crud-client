import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://go-movies-crud-zyiz.onrender.com/",
  headers: {
    "Content-type": "application/json",
  },
  timeout: 2000,
});

export const fetcher = (url: string) =>
  httpClient.get(url).then((res) => res.data);
