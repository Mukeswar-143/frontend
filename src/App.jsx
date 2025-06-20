import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/home/Navbar";
import Home from "./components/home/Home";
import About from "./components/About/About";
import Seller from "./components/Seller/Seller";
import ProductList from "./components/product/ProductList";
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Register from "./components/Register/Register";

function App() {
  return (
    <Router>
      <div className="main">
        <Navbar className="nav"/>
        <div className="container mt-1 w-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/seller" element={<Seller />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
