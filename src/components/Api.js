import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/product',
  headers: {
    'Content-Type': 'application/json',
  },
});

const productAPI = {
  getAll: () => api.get('/all'),
  getByPid: (id) => api.get(`/getProductById/${id}`),
  create: (data) => api.post('/entry', data),
  deleteByPid: (pid) => api.delete(`/deleteProductById/${pid}`),
};

export default productAPI;
