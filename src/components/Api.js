import axios from "axios";

const BASE_URL = "http://localhost:8080/product";

const productAPI = {
  create: (data) => axios.post(`${BASE_URL}/entry`, data),
  getPaginated: (page = 0, size = 5) => axios.get(`${BASE_URL}/getProductByPagination?page=${page}&size=${size}`),
  deleteByPid: (pid) => axios.delete(`${BASE_URL}/deleteProductById/${pid}`),
};

export default productAPI;
