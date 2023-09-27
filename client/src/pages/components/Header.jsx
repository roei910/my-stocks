import React from "react";
import { Link, NavLink } from "react-router-dom";
import {removeConnectionToken} from '../../utils/cookies';

function Header() {
  const classNameFunc = ({ isActive }) => (isActive ? "navbar-item active" : "navbar-item");

  return (
    <header>
      <nav className="navbar">
        <NavLink className={classNameFunc} to="/">My Broker</NavLink>
        <NavLink className={classNameFunc} to="/stocks">Stocks</NavLink>
        <NavLink className={classNameFunc} to="/stocks-search">Search Stocks</NavLink>
        <NavLink className={classNameFunc} to="/login">Login</NavLink>
        <Link className="navbar-item" to='/' onClick={() => removeConnectionToken()}>Dissconnect</Link>
      </nav>
    </header>
  );
}

export default Header;



