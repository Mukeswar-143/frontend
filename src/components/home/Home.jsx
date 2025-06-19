import React from 'react';
import Login from "../Login/Login";
import './Home.css';

export default function Home() {
    return (
        <div className="main">
            <div className="category">
                <h1>Welcome to ShopVerse</h1>
            </div>
            <div className="login">
                <Login />
            </div>
        </div>
    );
}
