import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../assests/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="navbar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>

      <div className="navbar-search">
        <input type="text" placeholder="Search products..." />
        <button>Search</button>
      </div>

      <div className={`nav ${menuOpen ? "active" : ""}`}>
        <Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link>
        <Link to="/about" className="nav-link" onClick={toggleMenu}>About</Link>
        <Link to="/seller" className="nav-link" onClick={toggleMenu}>Seller</Link>
        <Link to="/products" className="nav-link" onClick={toggleMenu}>Product</Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${menuOpen ? "rotate1" : ""}`}></div>
        <div className={`bar ${menuOpen ? "fade" : ""}`}></div>
        <div className={`bar ${menuOpen ? "rotate2" : ""}`}></div>
      </div>
    </div>
  );
}
