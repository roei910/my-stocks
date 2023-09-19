import React from "react";
import './App.css';

function Header() {
  return (
    <header>
      <ul className="navbar">
        <li>
          <a className="navbar-item" href="/">Home</a>
        </li>
        <li>
          <a className="navbar-item" href="/">Connect</a>
        </li>
        <li >
          <a className="navbar-item" href="/">Register</a>
        </li>
      </ul>
    </header>
  );
}

export default Header;
