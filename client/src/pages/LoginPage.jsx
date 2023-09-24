import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [signUp, setSignUp] = useState(false);
  const [userInformation, setUserInformation] = useState({ username: '', password: '' });
  const [userRegister, setUserRegister] = useState({ username: '', email: '', password: '', confirmPassword: '' });

  function signUpClick() {
    setSignUp(true);
  }

  function registerUser(event) {
    event.preventDefault();
    axios
      .post(`http://localhost:8000/register`, userRegister, {
        headers: {
          'content-type': 'application/json;charset=utf-8'
        }
      })
      .then((response) => {
        response.data.message ? alert(response.data.message) : alert(`New user successfully registered with the name ${response.data.user.username}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function connectUser(event) {
    event.preventDefault();
    axios
      .post(`http://localhost:8000/login`, userInformation)
      .then((response) => {
        // console.log(response.status === 200); //user authorized
        alert('connected successfully');
      })
      .catch((error) => {
        // console.log(error.response.status === 401); // user unauthorized, username or password incorrect
        alert('incorrect username or password');
      });


    //delete all users from db
    // axios
    //   .delete(`http://localhost:8000/users/all`)
    //   .then((response) => {
    //     // console.log(response.status === 200); //user authorized
    //     alert('connected successfully');
    //   })
    //   .catch((error) => {
    //     // console.log(error.response.status === 401); // user unauthorized, username or password incorrect
    //     alert('incorrect username or password');
    //   });
  }

  function onChangeSignInformation(event) {
    const { value, name } = event.target;
    if (name === 'username') {
      setUserInformation((old) => { return { ...old, username: value } });
    } else {
      setUserInformation((old) => { return { ...old, password: value } });
    }
  }

  function onChangeRegister(event) {
    const { value, name } = event.target;
    if (name === 'username') {
      setUserRegister((old) => { return { ...old, username: value } });
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
        <label>Username</label>
        <input type="text" name="username" id="userName" value={userInformation.username} onChange={onChangeSignInformation} />
        <br />
        <label>Password</label>
        <input type="password" name="password" value={userInformation.password} onChange={onChangeSignInformation} />
        <br />
        <button type="submit">Connect</button>
      </form>
      <h2>If you dont have an account yet, <button className="btn-style-rm" onClick={signUpClick}>click here</button></h2>
      {signUp && <form onSubmit={registerUser}>
        <label>Username</label>
        <input type="text" name="username" value={userRegister.username} onChange={onChangeRegister} />
        <br />
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
