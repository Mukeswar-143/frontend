import "bootstrap/dist/css/bootstrap.min.css";

export default function Seller() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Seller Registration</h2>
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Seller Name"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="product"
                  className="form-control"
                  placeholder="Product Name"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  name="description"
                  className="form-control"
                  placeholder="Product Description"
                  rows="4"
                  required
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
