import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import SHA256 from 'crypto-js/sha256';
import connstr from './constr.js';

function Register() {
  const [user, setUser] = useState({ fullname: '', name: '', email: '', pwd: '', pfp: 'default.jpg' });
  const [error, setError] = useState('');

  useEffect(() => {
    document.getElementById('err').style.visibility = 'hidden';
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (user.fullname === '') {
      setError('Name cannot be blank');
      document.getElementById('err').style.color = "red";
      document.getElementById('fullname').focus();
    } else if (user.name === '') {
      setError('Username cannot be blank');
      document.getElementById('err').style.color = "red";
      document.getElementById('name').focus();
    } else if (user.email === '') {
      setError('Email cannot be blank');
      document.getElementById('err').style.color = "red";
      document.getElementById('email').focus();
    } else if (user.pwd === '') {
      setError('Password cannot be blank');
      document.getElementById('err').style.color = "red";
      document.getElementById('pwd').focus();
    } else if (!user.email.match(/[A-Za-z0-9._]+@[a-zA-Z]+\.[a-zA-Z.]+/)) {
      setError('Invalid email address! Must be a valid email format.');
      document.getElementById('err').style.color = "red";
      document.getElementById('email').focus();
    } else if (!user.pwd.match(/[A-Za-z0-9._@]{7}[a-zA-Z0-9._@]*/)) {
      setError('Invalid password. Must be at least 7 characters.');
      document.getElementById('err').style.color = "red";
      document.getElementById('pwd').focus();
    } else {
      // user.pwd = SHA256(user.pwd).toString();
      $.ajax({
        type: 'POST',
        url: `${connstr}/editorbackend/insert.php?datafor=register`,
        data: user,
        success: (data) => {
          console.log(data);
          const obj = JSON.parse(data);
          console.log(data);
          if (obj.regstat === 'success') {
            alert('Registration successful!');
            window.location.href = '/login';
          } else {
            alert('Registration failed!');
            window.location.href = '/register';
          }
        },
        error: (jqXHR, textStatus, errorThrown) => {
          setError(`Registration failed: ${textStatus} - ${errorThrown}`);
          console.error(`Error: ${textStatus}`, errorThrown);
        },
      });
    }
  };

  return (
    <div
      align="center"
      style={{
        background: 'linear-gradient(135deg, #6a1b9a, #8e44ad)',
        height: '100vh',
        width: '1200vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'left',
      }}
    >
      <Container
        style={{
          borderRadius: '25px',
          width: '30rem',
          height: 'auto',
          background: 'white',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          padding: '10px',
        }}
      >
        <h1
          align="center"
          style={{
            fontSize: '24px',
            color: 'black',
            fontStyle: 'normal',
            marginBottom: '20px',
          }}
        >
          Create an Account
        </h1>
        <Alert variant="warning" id="err" style={{ visibility: error ? 'visible' : 'hidden' }}>
          {error}
        </Alert>
        <Form method="POST" autoComplete="off" noValidate onSubmit={handleRegister}>
          <Form.Group>
            <Form.Label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', color: 'black' }}>
              Full Name:
            </Form.Label>
            <Form.Control
              type="text"
              name="fullname"
              id="fullname"
              value={user.fullname}
              onChange={handleChange}
              style={{
                width: '100%',
                margin:"left",
                padding: '1px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', color: 'black' }}>
              UserName:
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              id="name"
              value={user.name}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', color: 'black' }}>
              Email:
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', color: 'black' }}>
              Password:
            </Form.Label>
            <Form.Control
              type="password"
              name="pwd"
              id="pwd"
              value={user.pwd}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            />
          </Form.Group>
          <br />
          <Button
            type="submit"
            id="reg"
            name="reg"
            style={{
              backgroundColor: '#6a1b9a',
              color: 'white',
              padding: '10px',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background 0.3s ease',
            }}
          >
            Register
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Register;