import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pnumber: "",
    address: "",
    password: "",
    repassword: "",
  });

  const modalRef = useRef(null); // Bootstrap modal reference

  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.repassword) {
      setModalMessage("❌ Passwords do not match.");
      new window.bootstrap.Modal(modalRef.current).show();
      return;
    }

    try {
      const userPayload = {
        name: formData.name,
        email: formData.email,
        pnumber: Number(formData.pnumber),
        address: formData.address,
        password: formData.password,
      };

      await axios.post("http://localhost:8080/register/entry", userPayload);

      setModalMessage("✅ Registration successful!");
      new window.bootstrap.Modal(modalRef.current).show();
    } catch (err) {
      setModalMessage("❌ Registration failed. Try again.");
      new window.bootstrap.Modal(modalRef.current).show();
    }
  };

  const handleModalOk = () => {
    if (modalMessage.includes("successful")) {
      navigate("/"); // Redirect to login/home page
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-5 shadow" style={{ width: "100%", maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="pnumber" className="form-label">Phone Number</label>
            <input type="tel" className="form-control" id="pnumber" value={formData.pnumber} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control" id="address" value={formData.address} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="mb-4">
            <label htmlFor="repassword" className="form-label">Re-enter Password</label>
            <input type="password" className="form-control" id="repassword" value={formData.repassword} onChange={handleChange} required />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
        </form>

        <p className="text-center mt-3">
          Already have an account? <Link to="/" className="text-decoration-none text-primary">Login</Link>
        </p>
      </div>

      {/* ✅ Modal for Success/Error Message */}
      <div
        className="modal fade"
        ref={modalRef}
        tabIndex="-1"
        aria-labelledby="modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Registration Status</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body text-center">
              {modalMessage}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleModalOk}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
