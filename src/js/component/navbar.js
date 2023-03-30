import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  //<a href="./demo.html">
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">
            Contact List App Using React & Context
          </span>
        </Link>
        <div className="ml-auto">
          <Link to="/demo">
            <button className="btn btn-sm btn-secondary">MENU</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
