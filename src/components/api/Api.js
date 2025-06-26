import axios from "axios";

const BASE_URL = "http://localhost:8080/product";

// Utility to get Authorization headers
const authHeader = () => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

const productAPI = {
  // Create product (secured)
  create: (data) => axios.post(`${BASE_URL}/entry`, data, authHeader()),

  // Paginated product fetch (secured)
  getPaginated: ({ page = 0, size = 5, category = "", sortBy = "price", direction = "asc" } = {}) => {
    let url = `${BASE_URL}/getProducts?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`;
    if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    }
    return axios.get(url, authHeader());
  },

  // Get all products (secured)
  getAll: () => axios.get(`${BASE_URL}/all`, authHeader()),

  // Get product by ID (secured)
  getById: (id) => axios.get(`${BASE_URL}/getProductById/${id}`, authHeader()),

  // Delete product by PID (secured)
  deleteByPid: (pid) => axios.delete(`${BASE_URL}/deleteProductById/${pid}`, authHeader()),

  // Get by category (secured)
  getByCategory: (category) =>
    axios.get(`${BASE_URL}/getProducts?page=0&size=100&category=${encodeURIComponent(category)}`, authHeader())
};

export default productAPI;
