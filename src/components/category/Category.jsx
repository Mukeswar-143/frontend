import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/product/getProducts?category=${categoryName}`)
      .then((res) => {
        setProducts(res.data.content); // Assuming paginated response
      })
      .catch((err) => {
        console.error("Error fetching products", err);
      });
  }, [categoryName]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">{categoryName} Products</h2>
      <div className="row g-4">
        {products.length > 0 ? (
          products.map((product, idx) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={idx}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{product.pname}</h5>
                  <p className="card-text">₹{product.price}</p>
                   <p className="card-text">{product.pdesc}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products found in this category.</p>
        )}
      </div>
    </div>
  );
}
