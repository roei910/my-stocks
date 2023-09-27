import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getConnectionToken } from '../utils/cookies';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getConnectionToken().then((token) => {
      axios
        .post(`http://localhost:8000/users/authentication`,
          {
            token: token
          }, {
          headers: {
            'content-type': 'application/json;charset=utf-8'
          }
        })
        .then((response) => {
          if (response.status === 200) {
            navigate('/stocks');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

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
