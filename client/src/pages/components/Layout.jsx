import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = (props) => {
  return (
    <div className="App">
      <Header connected={props.connected}/>
      <Outlet />
      <Footer /> 
    </div>
  );
};

export default Layout;
