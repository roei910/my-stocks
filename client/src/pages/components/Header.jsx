import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav>
        <ul className="navbar">
          <li>My Broker</li>
          <li className="navbar-item">
            <Link to="/">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/stocks">Stocks</Link>
          </li>
          <li className="navbar-item">
            <Link to="/stocks/search">Search Stocks</Link>
          </li>
          <li className="navbar-item">
            <Link to="/login">Login</Link>
          </li>          
        </ul>
      </nav>
    </header>
  );
}

export default Header;
