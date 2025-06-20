import React, { useEffect, useState } from 'react';
import productAPI from '../api/Api';
import ProductForm from './ProductForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    try {
      const res = await productAPI.getPaginated({ page, size: 5 });
      if (Array.isArray(res.data)) {
        setProducts(res.data);
        setTotalPages(1);
      } else {
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
    <div className="container py-4">
      <h1 className="text-center mb-4">Product Catalog</h1>

      <ProductForm onSuccess={fetchProducts} />

      <h4 className="mt-4">Product List (Page {page + 1} of {totalPages})</h4>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
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
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.pid)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <button className="btn btn-outline-primary" onClick={() => setPage(page - 1)} disabled={page === 0}>
          Previous
        </button>
        <span>Page {page + 1} of {totalPages}</span>
        <button className="btn btn-outline-primary" onClick={() => setPage(page + 1)} disabled={page + 1 >= totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
