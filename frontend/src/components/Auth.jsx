
import { useState } from "react";
import '../App.jsx';
import axios from "axios";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import './Inner.css';

export const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
  
    const onSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch("/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
  
        setCookies("access_token", data.token);
        window.localStorage.setItem("userId", data.userID);
        navigate("/home");
      } catch (err) {
        console.error(err);
        window.alert("Incorrect password. Please try again.");
      }
    };
  
    return (
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label={"Login"}
        onSubmit={onSubmit}
      />
    );
  };
  
  const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const onSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch("/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
  
        alert(data.message);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 409) {
          alert(err.response.data.message);
        } else {
          alert('An error occurred during registration. Please try again later.');
        }
      }
    };
  
    return (
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label={"Register"}
        onSubmit={onSubmit}
      />
    );
  };


const Form = ({ username, setUsername, password, setPassword, label, onSubmit }) => {
  return (
    <div className="auth-page">
    <div className="auth-container">
      <form onSubmit={onSubmit} className="form">
      <div className='logo'>
      <i class='fab fa-soundcloud'></i>
      <h1>Melostream</h1>
      </div>
        <h1>{label}</h1>
        <div className="form-group">
          <label htmlFor="username">UserName :</label>
          <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password :  </label>
          <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>

        <button type="submit">{label}</button>
      </form>
    </div>
    </div>
  );
};