import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar is-dark" 
        id="nav" 
        role="navigation" 
        aria-label="main navigation"
        style={{ paddingLeft:10, paddingRight:10}}
        >
    <div className="navbar-brand">
        <a href="#" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false"
            data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>
    <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
            <a href="#" className="navbar-item">
                <div className="title" style={{paddingRight:20}}>Reefbase</div>
            </a>
            <Link className="navbar-item" to="/about">About</Link>
            <Link className="navbar-item" to="/destinations">Destinations</Link>
        </div>
        <div className="navbar-end">
            <a href="#" className="navbar-item">Harin</a>
            <a className="navbar-item">Logout</a>
        </div>
    </div>
</nav>
  );
}

export default Navbar;
