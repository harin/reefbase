import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Site from './Site'
import Destinations from './Destinations'


function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function AppRouter() {
  return (
    <Router>
      <div>
        <Navbar />
        <Route path="/sites/:id" component={Site} />
        <Route path="/about/" component={About} />
        <Route path="/destinations/" component={Destinations} />
      </div>
    </Router>
  );
}

export default AppRouter;

