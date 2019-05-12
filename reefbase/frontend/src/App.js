import React from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import Navbar from './Navbar'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Destination from './Destination'
import DestinationList from './DestinationList'
import sites from './divesites.js' 

function DestinationPage(props) {
  return <Destination sites={sites}></Destination>
}

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
        <Route path="/about/" component={About} />
        <Route path="/destinations/" exact component={DestinationList} />
        <Route path="/destinations/:country/:name" component={DestinationPage} />
      </div>
    </Router>
  );
}

export default AppRouter;

