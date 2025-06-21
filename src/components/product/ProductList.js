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

  const renderPagination = () => {
    const items = [];
    for (let i = 0; i < totalPages; i++) {
      items.push(
        <li key={i} className={`page-item ${page === i ? "active" : ""}`}>
          <button className="page-link" onClick={() => setPage(i)}>
            {i + 1}
          </button>
        </li>
      );
    }
    return items;
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

      {/* Bootstrap Pagination */}
      <nav className="d-flex justify-content-center mt-4">
        <ul className="pagination">
          <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(page - 1)}>
              Previous
            </button>
          </li>

          {renderPagination()}

          <li className={`page-item ${page + 1 >= totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(page + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductList;
