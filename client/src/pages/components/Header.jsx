import React from "react";
import { Link, NavLink } from "react-router-dom";
import { removeConnectionToken } from "../../utils/cookies";

function Header(props) {
  const classNameFunc = ({ isActive }) =>
    isActive ? "navbar-item active" : "navbar-item";

  return (
    <header>
      <nav className="navbar">
        <NavLink className={classNameFunc} to="/">
          My Broker
        </NavLink>
        {props.connected && (
          <NavLink className={classNameFunc} to="/stocks">
            Stocks
          </NavLink>
        )}
        {props.connected && (
          <NavLink className={classNameFunc} to="/stocks-search">
            Search Stocks
          </NavLink>
        )}
        {props.connected && (
          <Link
            className="navbar-item"
            onClick={() => {
              let ans = window.confirm('are you sure you want to disconnect?');
              if(ans){
                removeConnectionToken();
                document.location.replace('/');
              }
            }}
          >
            Disconnect
          </Link>
        )}
        {!props.connected && (
          <NavLink className={classNameFunc} to="/login">
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default Header;
