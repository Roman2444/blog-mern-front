import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4444",
});

// добавляем мидлвэ, чтобы при каждом запросе на бэкэнд отравлялся токен из localStorage,
// чтобы понимать авторизован пользователь или нет

instance.interceptors.request.use((config) => {
  config.headers.Authorisation = window.localStorage.getItem("token");
  return config;
});

export default instance;
