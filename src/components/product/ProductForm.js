import React, { useState } from 'react';
import productAPI from '../api/Api';

const ProductForm = ({ onSuccess }) => {
  const [product, setProduct] = useState({
    pid: '',
    pname: '',
    price: '',
    category: '',
    pdesc: '',
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await productAPI.create(product);
      setProduct({ pid: '', pname: '', price: '', category: '', pdesc: '' });
      onSuccess();
    } catch (error) {
      alert(error.response?.data || "Error adding product");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="pid" value={product.pid} onChange={handleChange} placeholder="Product ID" required />
      <input name="pname" value={product.pname} onChange={handleChange} placeholder="Product Name" required />
      <input name="price" value={product.price} onChange={handleChange} placeholder="Price" required />
      <input name="category" value={product.category} onChange={handleChange} placeholder="Category" required />
      <textarea name="pdesc" value={product.pdesc} onChange={handleChange} placeholder="Description" required />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
