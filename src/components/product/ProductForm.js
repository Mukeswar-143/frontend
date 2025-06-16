import React, { useState } from 'react';
import productAPI from '../Api';

const ProductForm = ({ onSuccess }) => {
  const [form, setForm] = useState({ pid: '', pname: '', price: '', pdesc: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await productAPI.create(form);
      setForm({ pid: '', pname: '', price: '', pdesc: '' });
      onSuccess();
    } catch (err) {
      if (err.response?.status === 409) {
        setError('Product with the same PID already exists.');
      } else {
        setError('Error adding product.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Product</h3>
      <input name="pid" placeholder="PID" value={form.pid} onChange={handleChange} required />
      <input name="pname" placeholder="Name" value={form.pname} onChange={handleChange} required />
      <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
      <input name="pdesc" placeholder="Description" value={form.pdesc} onChange={handleChange} />
      <button type="submit">Add</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default ProductForm;
