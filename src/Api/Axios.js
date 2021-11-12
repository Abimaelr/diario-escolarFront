import axios from "axios";

const api = axios.create({
  baseURL: "http://diario-escolar-backend.herokuapp.com/"
});

api.defaults.headers.common['Authorization'] = localStorage.getItem('token');

export default api;