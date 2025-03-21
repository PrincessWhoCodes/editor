import React from 'react';
import {useState,useEffect} from 'react';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import SHA256 from 'crypto-js/sha256';
import Dashboard from './Dashboard';

function Login()
{
  
     var credentials = {"email":"","pwd":"","datafor":"login"};

     useEffect(() => {
      document.getElementById('err').style.visibility = "hidden";
      
      // Check if the user is logged in and if the user is active
      if(localStorage.getItem('logstatus') === "true") {
          
              // If account is active, continue to the home or dashboard page
              window.location.href = "http://localhost:3000/";
          }
      });

  
      
      const handlePwd = (e) => {
          credentials["pwd"] = e.target.value;
          console.log(credentials);
      }
      const handleLog = (e) => {
          credentials["email"] = e.target.value;
      }
      const handleSmbt = (e) => {
            if(credentials["email"]==="")
            {
                  e.preventDefault();
                  e.stopPropagation();
                  document.getElementById('email').focus();
                  document.getElementById('err').style.visibility = "visible";
                  document.getElementById('err').style.color = "red";
                  document.getElementById('err').innerHTML="Email or Phone cannot be blank";
            }
            else if(credentials["pwd"]==="")
            {
                  e.preventDefault();
                  e.stopPropagation();
                  document.getElementById('pwd').focus();
                  document.getElementById('err').style.visibility = "visible";
                  document.getElementById('err').style.color = "red";
                  document.getElementById('err').innerHTML="Password cannot be blank";
            }
            else{
                  e.preventDefault();
                  e.stopPropagation();
                  $.ajax({type:"POST",url:"http://localhost/editorbackend/select.php",data:credentials,success(data){
                        console.log(data);
                        var obj = JSON.parse(data);
                        console.log(obj);
                        if(obj.length>0){
                              console.log("bye");
                              localStorage.setItem("logstatus","true");
                              localStorage.setItem("userid",obj[0].userid);
                              localStorage.setItem("isadmin",obj[0].isadmin);
                              localStorage.setItem("active",obj[0].active);
                              if (obj[0].active.toString() === "0") {
                                    // Redirect to the 'deactive.js' page if the account is deactivated
                                    window.location.href = "http://localhost:3000/deactive";
                                    
                                } else if(obj[0].isadmin.toString() === "0")
                                      {
                                        console.log("bye");
                                        window.location.href = "http://localhost:3000/";
                                    } else {
                                        console.log("bye");
                                        window.location.href = "http://localhost:3000/dashboard";
                                    }
                              }
            
                        }});
                  };
}     
            
      



return(
<>
<br/>
<br/>
<div align="center" style={{
        background: "linear-gradient(135deg, #6a1b9a, #8e44ad)",
        height: "100vh",
        width:"400vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"}}>
<Container style={{borderRadius:"25px",width:"25rem",height:"25rem",background:"white",boxShadow:"0 4px 8px rgba(0, 0, 0, 0.2)"}}>
<br/>
<h1 align="center" style={{fontSize: '24px',
      color: 'black',fontStyle:'normal',
      marginBottom: '20px'}}>Login</h1>
<Alert variant="warning" id="err"></Alert>
<Form method="POST" onSubmit={(event) => handleSmbt(event)}>
    <br/>
<Form.Group>
    
<Form.Label style={{ display: 'block',
      fontSize: '14px',
      marginBottom: '5px',
      color: "black",}}>Email:</Form.Label>
<Form.Control type="email" name="email" id="email" onChange={(event) => handleLog(event)} style={{width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',}}></Form.Control>
</Form.Group> <br/>
<Form.Group>
<Form.Label style={{color:"black", display: 'block',
      fontSize: '14px',
      marginBottom: '5px'}}>Password:</Form.Label>
<Form.Control type="password" name="pwd" id="pwd" onChange={(event) => handlePwd(event)} style={{width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px'}}></Form.Control>
</Form.Group>
<br/>
<Button style={{  backgroundColor: '#6a1b9a', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', fontSize: '16px' }}  type="submit"  >Login</Button>
</Form>

<p style={{  marginTop: '10px',
      fontSize: '14px',}}>
          Don't have an account?{' '}
          <a href="/register" style={{ color: '#6a1b9a',
      textDecoration: 'none'}}>
            Register here
          </a>
        </p>
<br/>
</Container>
</div>
</>
);
}
export default Login;