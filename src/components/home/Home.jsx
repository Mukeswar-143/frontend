import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './Home.css';

export default function Home() {
  const categories = [
    { name: "Electronics", image: "https://cdn-icons-png.flaticon.com/512/1041/1041377.png" },
    { name: "Mobiles", image: "https://cdn-icons-png.flaticon.com/512/60/60580.png" },
    { name: "Clothes", image: "https://cdn-icons-png.flaticon.com/512/892/892458.png" },
    { name: "Home Appliances", image: "https://cdn-icons-png.flaticon.com/512/3208/3208758.png" },
    { name: "Books", image: "https://cdn-icons-png.flaticon.com/512/29/29302.png" },
    { name: "Sports", image: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png" },
    { name: "Beauty", image: "https://cdn-icons-png.flaticon.com/512/1998/1998720.png" },
    { name: "Toys", image: "https://cdn-icons-png.flaticon.com/512/3909/3909444.png" },
    { name: "Groceries", image: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png" }
  ];

  const carouselImages = [
    "https://www.kotak.com/content/dam/Kotak/herosliderbanner/shopping-cc-image-d.jpg",
    "https://www.kotak.com/content/dam/Kotak/herosliderbanner/credit-card-offers-d.jpg",
    "https://thumbs.dreamstime.com/b/portrait-excited-indian-family-holding-shopping-bags-credit-card-over-yellow-studio-background-portrait-excited-indian-349568018.jpg",
    "https://img.freepik.com/free-photo/excited-girl-open-up-shopping-bags-gasping-amazed-checking-out-gifts-her-with-happy-face-standing-against-pink-background_1258-300635.jpg?semt=ais_hybrid&w=740"
  ];

  return (
    <div className="container ">
      <div id="salesCarousel" className="carousel slide mb-5" data-bs-ride="carousel">
        <div className="carousel-inner rounded overflow-hidden d-none d-md-block ">
          {carouselImages.map((src, index) => (
            <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
              <div className="carousel-img-wrapper">
                <img
                  src={src}
                  className="d-block w-100 carousel-image"
                  alt={`Slide ${index + 1}`}
                />
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#salesCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#salesCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>


      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-md-6 text-center text-md-start mb-4 mb-md-0">
          <h1 className="display-5 shopverse-heading">Welcome to ShopVerse</h1>
          <p className="lead d-none d-md-block shop-text">Shop smarter. Shop better.</p>
          <p className="fs-5 d-none d-md-block text-center text-muted fw-semibold lh-lg">
            Your one-stop digital universe for smarter shopping. We bring you
            curated collections, unbeatable deals, and a seamless experience
            across categories you care about from fashion to tech, lifestyle
            to home essentials. With personalized recommendations, secure
            checkout, and lightning-fast delivery, ShopVerse isn’t just a store <br />
            — it’s your shopping universe reimagined.
          </p>
        </div>

        <div className="col-12 col-md-6">
          <div
            className="card p-4 p-md-5 shadow mx-auto"
            style={{ maxWidth: "450px", width: "100%" }}
          >
            <h2 className="text-center mb-4">Login</h2>

            <form>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingUsername"
                  placeholder="Username"
                  required
                />
                <label htmlFor="floatingUsername">Username</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  required
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <div className="d-grid mb-3">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>

            <div className="text-center text-muted my-2">or</div>

            <div className="d-grid mb-4">
              <button className="btn btn-outline-info d-flex align-items-center justify-content-center gap-2">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                  alt="Google"
                  width="20"
                  height="20"
                />
                Continue with Google
              </button>
            </div>

            <p className="text-center mb-0">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-primary text-decoration-none">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-center mb-4">Explore Categories</h3>
        <div className="row g-4">
          {categories.map((cat, index) => (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2 text-center" key={index}>
              <div className="card h-100 shadow-sm p-3">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="img-fluid mb-2"
                  style={{ maxHeight: "60px", objectFit: "contain" }}
                />
                <h6>{cat.name}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
