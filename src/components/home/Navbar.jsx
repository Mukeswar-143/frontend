import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../assests/logo.png";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>

      <div className="navbar-search">
        <input type="text" placeholder="Search products..." />
        <button>Search</button>
      </div>

      <div className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/seller" className="nav-link">Seller</Link>
        <Link to="/products" className="nav-link">Product</Link>
      </div>
    </div>
  );
}
