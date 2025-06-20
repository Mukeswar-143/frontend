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
    <form className="row g-3 mb-4" onSubmit={handleSubmit}>
      <div className="col-md-2">
        <input name="pid" value={product.pid} onChange={handleChange} className="form-control" placeholder="Product ID" required />
      </div>
      <div className="col-md-2">
        <input name="pname" value={product.pname} onChange={handleChange} className="form-control" placeholder="Product Name" required />
      </div>
      <div className="col-md-2">
        <input name="price" value={product.price} onChange={handleChange} className="form-control" placeholder="Price" required />
      </div>
      <div className="col-md-2">
        <input name="category" value={product.category} onChange={handleChange} className="form-control" placeholder="Category" required />
      </div>
      <div className="col-md-3">
        <textarea name="pdesc" value={product.pdesc} onChange={handleChange} className="form-control" placeholder="Description" required />
      </div>
      <div className="col-md-1">
        <button type="submit" className="btn btn-success w-100">Add</button>
      </div>
    </form>
  );
};

export default ProductForm;
