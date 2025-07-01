import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap"; // ✅ Proper import
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

    // Close main menu offcanvas
    let navbarOffcanvas = bootstrap.Offcanvas.getInstance(navbarOffcanvasEl);
    if (!navbarOffcanvas) {
      navbarOffcanvas = new bootstrap.Offcanvas(navbarOffcanvasEl);
    }
    navbarOffcanvas.hide();

    // Also close search offcanvas if open
    if (searchCanvasEl) {
      let searchOffcanvas = bootstrap.Offcanvas.getInstance(searchCanvasEl);
      if (searchOffcanvas) {
        searchOffcanvas.hide();
      }
    }

    // Remove all remaining offcanvas backdrops
    document.querySelectorAll(".offcanvas-backdrop").forEach((backdrop) => backdrop.remove());

    // Clean up any leftover body classes
    document.body.classList.remove("offcanvas-backdrop", "show", "modal-open", "offcanvas-open");
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
      const offcanvas = new bootstrap.Offcanvas("#searchResultsCanvas");
      offcanvas.show();
    } catch (err) {
      setResults([]);
      setError("Error fetching search results. Please try again.");
      const offcanvas = new bootstrap.Offcanvas("#searchResultsCanvas");
      offcanvas.show();
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

              <form className="d-flex mt-3" onSubmit={handleSearch}>
                <input
                  className="form-control me-2"
                  type="text"
                  placeholder="Search by category..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  required
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>

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

      {/* Search Results Offcanvas */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="searchResultsCanvas"
        aria-labelledby="searchResultsCanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 id="searchResultsCanvasLabel">Search Results</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          {error ? (
            <div className="text-danger text-center fw-semibold">{error}</div>
          ) : results.length === 0 ? (
            <div className="text-muted text-center">No products found</div>
          ) : (
            <ul className="list-group">
              {results.map((item) => (
                <li key={item.pid} className="list-group-item">
                  <h5>{item.pname}</h5>
                  <p>
                    <strong>Category:</strong> {item.category}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{item.price}
                  </p>
                  <p>{item.pdesc}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
