import React, { useEffect, useState } from 'react';
import productAPI from '../Api';
import ProductForm from './ProductForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const res = await productAPI.getAll();
    setProducts(res.data);
  };

  const handleDelete = async (pid) => {
    await productAPI.deleteByPid(pid);
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <ProductForm onSuccess={loadProducts} />
      <h3>Product List</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>PID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.pid}</td>
              <td>{p.pname}</td>
              <td>{p.price}</td>
              <td>{p.pdesc}</td>
              <td>
                <button onClick={() => handleDelete(p.pid)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
