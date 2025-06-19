import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/home/Navbar";
import Home from "./components/home/Home";
import About from "./components/About/About";
import Seller from "./components/Seller/Seller";
import ProductList from "./components/product/ProductList";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/seller" element={<Seller/>}/>
        <Route path="/products" element={<ProductList/>}/>
      </Routes> 
    </Router>
  );
}

export default App;
