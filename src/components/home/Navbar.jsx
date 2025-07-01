import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap"; // ✅ Proper import for JS
import productAPI from "../api/Api";
import "./Navbar.css";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const closeNavbarOffcanvas = () => {
    const navbarOffcanvasEl = document.getElementById("navbarOffcanvas");
    const searchCanvasEl = document.getElementById("searchResultsCanvas");

    // Hide Navbar menu
    let navbarOffcanvas = bootstrap.Offcanvas.getInstance(navbarOffcanvasEl);
    if (!navbarOffcanvas) {
      navbarOffcanvas = new bootstrap.Offcanvas(navbarOffcanvasEl);
    }
    navbarOffcanvas.hide();

    // Also hide search results if open
    if (searchCanvasEl) {
      let searchOffcanvas = bootstrap.Offcanvas.getInstance(searchCanvasEl);
      if (searchOffcanvas) {
        searchOffcanvas.hide();
      }
    }

    // Clean up any remaining backdrops
    document.querySelectorAll(".offcanvas-backdrop").forEach((backdrop) =>
      backdrop.remove()
    );
    document.body.classList.remove(
      "offcanvas-backdrop",
      "show",
      "modal-open",
      "offcanvas-open"
    );
    document.body.style.overflow = "auto";
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await productAPI.getByCategory(searchInput);
      const data = res.data.content || res.data;
      if (data.length === 0) {
        setError(`No products found for "${searchInput}"`);
        setResults([]);
      } else {
        setResults(data);
        setError("");
      }

      const searchCanvasEl = document.getElementById("searchResultsCanvas");
      let searchOffcanvas = bootstrap.Offcanvas.getInstance(searchCanvasEl);
      if (!searchOffcanvas) {
        searchOffcanvas = new bootstrap.Offcanvas(searchCanvasEl);
      }
      searchOffcanvas.show();
    } catch (err) {
      setResults([]);
      setError("Error fetching search results. Please try again.");
      const searchCanvasEl = document.getElementById("searchResultsCanvas");
      let searchOffcanvas = bootstrap.Offcanvas.getInstance(searchCanvasEl);
      if (!searchOffcanvas) {
        searchOffcanvas = new bootstrap.Offcanvas(searchCanvasEl);
      }
      searchOffcanvas.show();
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("jwtToken");
    alert("Logged out successfully.");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark p-3">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">
            ShopVerse
          </Link>

          {/* Toggle Offcanvas */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#navbarOffcanvas"
            aria-controls="navbarOffcanvas"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Offcanvas Menu */}
          <div
            className="offcanvas offcanvas-end text-bg-dark"
            tabIndex="-1"
            id="navbarOffcanvas"
            aria-labelledby="navbarOffcanvasLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="navbarOffcanvasLabel">
                Menu
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body d-flex flex-column gap-3">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    to="/"
                    onClick={closeNavbarOffcanvas}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    to="/products"
                    onClick={closeNavbarOffcanvas}
                  >
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    to="/about"
                    onClick={closeNavbarOffcanvas}
                  >
                    About
                  </Link>
                </li>
              </ul>
              {isLoggedIn && (
                <button
                  className="btn btn-outline-light mt-3"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
