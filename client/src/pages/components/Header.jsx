import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const classNameFunc = ({ isActive }) => (isActive ? "navbar-item active" : "navbar-item");
  return (
    <header>
      <nav className="navbar">
        <NavLink className={classNameFunc} to="/">My Broker</NavLink>
        <NavLink className={classNameFunc} to="/stocks">Stocks</NavLink>
        <NavLink className={classNameFunc} to="/stocks-search">Search Stocks</NavLink>
        <NavLink className={classNameFunc} to="/login">Login</NavLink>
      </nav>
    </header>
  );
}

export default Header;



