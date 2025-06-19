import React from 'react';
import Login from "../Login/Login";
import './Home.css';
import Greeting from '../Greeting';

export default function Home() {
    return (
        <div className="main">
            <div>
                <h1>Welcome to Props Demo</h1>
                <Greeting name="Mukesh" />
            </div>
            <div className="login">

                <Login />
            </div>
        </div>
    );
}
