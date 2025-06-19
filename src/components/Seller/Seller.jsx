import "./Seller.css";

export default function Seller() {
  return (
    <div className="main">
      <div className="search">
        <h1>Seller Registration</h1>
        <form className="seller-form">
          <input type="text" name="name" placeholder="Seller Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="text" name="product" placeholder="Product Name" required />
          <textarea name="description" placeholder="Product Description" rows="4" required />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
