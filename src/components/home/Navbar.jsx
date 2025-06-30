import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
  Offcanvas,
} from "react-bootstrap";
import productAPI from "../api/Api";
import "./Navbar.css";

function AppNavbar({ isLoggedIn, setIsLoggedIn }) {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const offcanvasRef = useRef(); // Reference to offcanvas

  const closeOffcanvas = () => {
    const offcanvasEl = offcanvasRef.current;
    if (offcanvasEl && offcanvasEl.classList.contains("show")) {
      const instance = window.bootstrap.Offcanvas.getInstance(offcanvasEl);
      instance?.hide();
    }
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
      const searchOffcanvas = new window.bootstrap.Offcanvas("#searchResultsCanvas");
      searchOffcanvas.show();
    } catch (err) {
      setResults([]);
      setError("Error fetching search results. Please try again.");
      const searchOffcanvas = new window.bootstrap.Offcanvas("#searchResultsCanvas");
      searchOffcanvas.show();
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert("Logged out successfully.");
    navigate("/");
  };

  return (
    <>
      <Navbar key="lg" expand="lg" className="bg-dark navbar-dark p-3 mb-3">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            ShopVerse
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
          <Navbar.Offcanvas
            ref={offcanvasRef}
            id="offcanvasNavbar-expand-lg"
            aria-labelledby="offcanvasNavbarLabel-expand-lg"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                ShopVerse Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-start flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/" onClick={closeOffcanvas}>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/products" onClick={closeOffcanvas}>
                  Products
                </Nav.Link>
                <Nav.Link as={Link} to="/about" onClick={closeOffcanvas}>
                  About
                </Nav.Link>
              </Nav>

              <Form className="d-flex me-3 mt-3 mt-lg-0" onSubmit={handleSearch}>
                <Form.Control
                  type="search"
                  placeholder="Search by category..."
                  className="me-2"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  required
                  style={{ width: "400px" }} // ⬅️ Adjust width as needed
                />
                <Button variant="outline-success" type="submit">
                  Search
                </Button>
              </Form>


              {isLoggedIn && (
                <Button
                  variant="outline-light"
                  className="ms-lg-3 mt-3 mt-lg-0"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {/* Offcanvas Search Results */}
      <div
        className="offcanvas offcanvas-start wide-offcanvas"
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
          ></button>
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

export default AppNavbar;
