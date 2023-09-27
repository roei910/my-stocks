import React, { useState } from "react";
import axios from "axios";
import { setConnectionCookie } from "../utils/cookies";
const LoginPage = () => {
  const [signUp, setSignUp] = useState(false);
  const [userInformation, setUserInformation] = useState({ email: '', password: '' });
  const [userRegister, setUserRegister] = useState({ email: '', password: '', confirmPassword: '' });

  function signUpClick() {
    setSignUp(true);
  }

  function registerUser(event) {
    event.preventDefault();
    axios
      .post(`http://localhost:8000/users/register`, userRegister, {
        headers: {
          'content-type': 'application/json;charset=utf-8'
        }
      })
      .then((response) => {
        response.data.message ? alert(response.data.message) : alert(`New user successfully registered with the name ${response.data.user.username}`);
        setConnectionCookie(response.data.token);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function connectUser(event) {
    event.preventDefault();
    axios
      .post(`http://localhost:8000/users/login`, userInformation)
      .then((response) => {
        if (response.status === 200) {
          alert('connected successfully');
          setConnectionCookie(response.data.token);
        } else {
          alert('connection error');
        }
      })
      .catch((error) => {
        if(error.response.status === 401){
          alert('incorrect username or password');
        } else {
          alert('something went wrong, please try again');
        }
      });
  }

  function onChangeSignInformation(event) {
    const { value, name } = event.target;
    if (name === 'email') {
      setUserInformation((old) => { return { ...old, email: value } });
    } else {
      setUserInformation((old) => { return { ...old, password: value } });
    }
  }

  function onChangeRegister(event) {
    const { value, name } = event.target;
    if (name === 'email') {
      setUserRegister((old) => { return { ...old, email: value } });
    } else if (name === 'email') {
      setUserRegister((old) => { return { ...old, email: value } });
    } else if (name === 'password') {
      setUserRegister((old) => { return { ...old, password: value } });
    } else {
      setUserRegister((old) => { return { ...old, confirmPassword: value } });
    }
  }

  return (
    <div className="main-content center">
      <h1>Please login here:</h1>
      <form onSubmit={connectUser}>
        <label>Email</label>
        <input type="text" name="email" id="userName" value={userInformation.email} onChange={onChangeSignInformation} />
        <br />
        <label>Password</label>
        <input type="password" name="password" value={userInformation.password} onChange={onChangeSignInformation} />
        <br />
        <button type="submit">Connect</button>
      </form>
      <h2>If you dont have an account yet, <button className="btn-style-rm" onClick={signUpClick}>click here</button></h2>
      {signUp && <form onSubmit={registerUser}>
        <label>Email address</label>
        <input type="email" name="email" value={userRegister.email} onChange={onChangeRegister} />
        <br />
        <label>Password</label>
        <input type="password" name="password" value={userRegister.password} onChange={onChangeRegister} />
        <br />
        <label>Confirm Password</label>
        <input type="password" name="confirm-password" value={userRegister.confirmPassword} onChange={onChangeRegister} />
        <br />
        <button type="submit">Click here</button>
      </form>}

    </div>
  );
};

export default LoginPage;
