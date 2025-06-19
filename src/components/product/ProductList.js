// ProductList.js
import React, { useEffect, useState } from 'react';
import productAPI from '../api/Api';
import ProductForm from './ProductForm';
import './Product.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1); // default to 1 if not using pagination

  const fetchProducts = async () => {
    try {
      const res = await productAPI.getPaginated({ page, size: 5 });
      if (Array.isArray(res.data)) {
        // when backend returns List<Product>
        setProducts(res.data);
        setTotalPages(1); // or calculate if needed
      } else {
        // when backend returns Page<Product>
        setProducts(res.data.content);
        setTotalPages(res.data.totalPages);
      }
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleDelete = async (pid) => {
    try {
      await productAPI.deleteByPid(pid);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  return (
    <div className="container">
      <h1>Product Catalog</h1>
      <ProductForm onSuccess={fetchProducts} />
      <h2>Product List (Page {page + 1} of {totalPages})</h2>
      <table>
        <thead>
          <tr>
            <th>PID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.pid}>
              <td>{p.pid}</td>
              <td>{p.pname}</td>
              <td>{p.price}</td>
              <td>{p.category}</td>
              <td>{p.pdesc}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(p.pid)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</button>
        <span>{page + 1} / {totalPages}</span>
        <button onClick={() => setPage(page + 1)} disabled={page + 1 >= totalPages}>Next</button>
      </div>
    </div>
  );
};

export default ProductList;
