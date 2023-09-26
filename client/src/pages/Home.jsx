import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import passport from "passport";

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //need to authenticate user

    // // To store data
    // localStorage.setItem('data', data);

    // // To retrieve data
    // localStorage.getItem('data');

    // // To clear a specific item
    // localStorage.removeItem('data');

    // // To clear the whole data stored in localStorage
    // localStorage.clear();

    setIsLoggedIn(false);
    
    if (isLoggedIn) {
      navigate('/stocks');
    }
  }, [navigate, isLoggedIn]);

  return (
    <div className="main-content center">
      <h1>Welcome to My-Broker</h1>
      <h2>what we do</h2>
      <p>allowing you to view all of your stocks, get important information forwaded to you right to your email.</p>
      <p>access all of the most important information about your stocks here</p>
      <h2>please connect to your account</h2>
      <p>if you don't have an account yet, be sure to sign up</p>
    </div>
  );
};

export default Home;
