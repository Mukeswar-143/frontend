import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-5 shadow" style={{ width: "100%", maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Register</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" required />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" required />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input type="tel" className="form-control" id="phone" required />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control" id="address" required />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" required />
          </div>

          <div className="mb-4">
            <label htmlFor="repassword" className="form-label">Re-enter Password</label>
            <input type="password" className="form-control" id="repassword" required />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
        </form>

        <p className="text-center mt-3">
          Already have an account? <Link to="/" className="text-decoration-none text-primary">Login</Link>
        </p>
      </div>
    </div>
  );
}
