import React, { useEffect, useState } from 'react';
import productAPI from '../Api';
import ProductForm from './ProductForm';
import './Product.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchProducts = async () => {
        try {
            const res = await productAPI.getPaginated(page, 5);
            setProducts(res.data.content);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.error("Error fetching products", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page]);

    const handleDelete = async (pid) => {
        await productAPI.deleteByPid(pid);
        fetchProducts();
    };

    return (
        <div className="container">
            <h1>Product Catalog</h1>
            <ProductForm onSuccess={fetchProducts} />
            <h2>Product List (Page {page + 1} of {totalPages})</h2>
            <table>
                <thead>
                    <tr>
                        <th>PID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.id}>
                            <td>{p.pid}</td>
                            <td>{p.pname}</td>
                            <td>{p.price}</td>
                            <td>{p.pdesc}</td>
                            <td>
                                <button className="delete-btn" onClick={() => handleDelete(p.pid)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</button>
                <span>{page + 1} / {totalPages}</span>
                <button onClick={() => setPage(page + 1)} disabled={page + 1 >= totalPages}>Next</button>
            </div>
        </div>
    );
};

export default ProductList;
