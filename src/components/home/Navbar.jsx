import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import productAPI from "../api/Api";
import "./Navbar.css";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      const offcanvas = new window.bootstrap.Offcanvas("#searchResultsCanvas");
      offcanvas.show();
    } catch (err) {
      setResults([]);
      setError("Error fetching search results. Please try again.");
      const offcanvas = new window.bootstrap.Offcanvas("#searchResultsCanvas");
      offcanvas.show();
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert("Logged out successfully.");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <Link className="navbar-brand fw-bold" to="/">ShopVerse</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
          </ul>

          <form className="d-flex me-3" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="text"
              placeholder="Search by category..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              required
              style={{ minWidth: "300px" }}
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>

          {isLoggedIn && (
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </nav>
      <div
        className="offcanvas offcanvas-start wide-offcanvas"
        tabIndex="-1"
        id="searchResultsCanvas"
        aria-labelledby="searchResultsCanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 id="searchResultsCanvasLabel">Search Results</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" />
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
                  <p><strong>Category:</strong> {item.category}</p>
                  <p><strong>Price:</strong> ₹{item.price}</p>
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
