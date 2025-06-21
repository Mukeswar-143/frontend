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

  const [alertMsg, setAlertMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success'); // 'success' or 'danger'

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await productAPI.create(product);
      setAlertMsg(`✅ Product added successfully! Name: ${product.pname}, Category: ${product.category}`);
      setAlertType('success');
      setShowAlert(true);
      setProduct({ pid: '', pname: '', price: '', category: '', pdesc: '' });
      onSuccess();
    } catch (error) {
      setAlertMsg(`❌ ${error.response?.data || "Error adding product"}`);
      setAlertType('danger');
      setShowAlert(true);
    }

    // Hide after 3 seconds
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="mb-4">
      {showAlert && (
        <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
          {alertMsg}
          <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
        </div>
      )}

      <form className="row g-3" onSubmit={handleSubmit}>
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
    </div>
  );
};

export default ProductForm;
