import axios from "axios";

const api = axios.create({
  baseURL: "https://joaopessoa.pb.gov.br/apidiarioonline"
});

api.defaults.headers.common['Authorization'] = localStorage.getItem('token');

export default api;