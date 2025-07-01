import axios from "axios";

const BASE_URL = "https://productcatlog.onrender.com/product";

const authHeader = () => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

const productAPI = {

  create: (data) => axios.post(`${BASE_URL}/entry`, data, authHeader()),

  getPaginated: ({ page = 0, size = 5, category = "", sortBy = "price", direction = "asc" } = {}) => {
    let url = `${BASE_URL}/getProducts?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`;
    if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    }
    return axios.get(url, authHeader());
  },

  getAll: () => axios.get(`${BASE_URL}/all`, authHeader()),

  getById: (id) => axios.get(`${BASE_URL}/getProductById/${id}`, authHeader()),

  deleteByPid: (pid) => axios.delete(`${BASE_URL}/deleteProductById/${pid}`, authHeader()),

  getByCategory: (category) =>
    axios.get(`${BASE_URL}/getProducts?page=0&size=100&category=${encodeURIComponent(category)}`, authHeader())
};

export default productAPI;