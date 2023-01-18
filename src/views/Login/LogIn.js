import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { AuthContext } from '../../context/AuthContext';
import './Register.css';

function LogIn() {

  const { login, error, setError } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(null);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(null);
  };

  const handleLogin = () => {
    login(email, password);
  };


  return (
    <>
      <NavBar />
      <div className="backgroundDiv">
        <br /><br /><br />
        <Form className="formDiv">
          <h1>Log In</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="formText">Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} required />
            { error === "auth/user-not-found" && <p className="warningText">User not found.</p>}
            { error === "auth/invalid-email" && <p className="warningText">Invalid email.</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="formText">Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
            { error === "auth/wrong-password" && <p className="warningText">Password not correct.</p>}
            <Link to="/register">Not yet registered?</Link>
          </Form.Group>
          <button type="button" className="submitButton" onClick={handleLogin}>Log In</button>
        </Form>
        <br /><br /><br /><br />
      </div>
    </>
  )
}

export default LogIn