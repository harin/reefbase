import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar is-dark" id="nav" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false"
            data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>
    <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
            <a href="#" className="navbar-item">
                <div className="title">Reefbase</div>
            </a>
            <Link className="navbar-item" to="/about">About</Link>
            <Link className="navbar-item" to="/destinations">Destinations</Link>
        </div>
        <div className="navbar-end">
            <div className="navbar-item">
                <button className="button" id="login-button">Harin</button>
                <button className="button is-dark">Logout</button>
            </div>
        </div>
    </div>
</nav>
  );
}

export default Navbar;
