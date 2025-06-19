import axios from "axios";

const BASE_URL = "http://localhost:8080/product";

const productAPI = {
  create: (data) => axios.post(`${BASE_URL}/entry`, data),

  getPaginated: ({ page = 0, size = 3, category = "", sortBy = "price", direction = "asc" } = {}) => {
    let url = `${BASE_URL}/all/getProducts?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`;
    if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    }
    return axios.get(url);
  },

  getAll: () => axios.get(`${BASE_URL}/all`),

  getById: (id) => axios.get(`${BASE_URL}/getProductById/${id}`),

  deleteByPid: (pid) => axios.delete(`${BASE_URL}/deleteProductById/${pid}`),
};

export default productAPI;

