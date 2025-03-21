import React from "react";
import Usersidebar from "./Usersidebar.js";
import Spline from '@splinetool/react-spline';
import styled from 'styled-components';
import {useState,useEffect} from 'react';
import $ from 'jquery';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { CardGroup, InputGroup } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaUserCircle } from "react-icons/fa";
import Profile from "./Profile.js";
import { Carousel }  from 'react-bootstrap'; 
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import connstr from './constr.js';
// import Spline from '@splinetool/react-spline';

function Home() {
 
        // const styles = {
        //   body: {
        //     backgroundColor:"#2E073F"
        //   }}
        const [rotation, setRotation] = useState(0);
        useEffect(() => {
          const interval = setInterval(() => {
            setRotation((prev) => (prev + 5) % 360);
          }, 100); // Rotates smoothly every 100ms
          return () => clearInterval(interval);
        }, []);
        const logout = () =>{
              localStorage.setItem("logstatus","false");
              localStorage.setItem("userid","");
              localStorage.setItem("isadmin","");
              console.log("Logged Out");
        }
        const testimonials = [
          {
            quote: "VioletCode is a game changer! The real-time preview is amazing.",
            name: "Aarav Mehta",
          },
          {
            quote: "Collaboration is so smooth! Perfect for team projects.",
            name: "Sneha Kapoor",
          },
          {
            quote: "The dark theme is just perfect for late-night coding!",
            name: "Rahul Sharma",
          },
        ];
  return (
  


<>
        <Usersidebar />
     
    
  
      
      
            {/* Main Content Area */}
            <div className="w-100 h-64 overflow-y-scroll p-4 border border-purple-300 rounded-lg scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-purple-200" style={{  minHeight: "100vh",padding: "90px"  }}>
              {/* Top Right Buttons */}
             
             
              
              {/* Home Page Content */}
              <Container
                //style={{
                //  overflowY: "auto"
                //   height: "100%",
                //   display: "flex",
                //   justifyContent: "center",
                //   alignItems: "center",
                //   textAlign: "center",
                //}}
              >
               
                <Row>
                  <Col md={12}>
                  <h1 style={{    
    borderRadius: "20px", 
    color: "white", 
    padding: "10px 5px", 
    fontSize: "2rem", 
    fontWeight: "bold", 
    textAlign: "center", 
    boxShadow: "0 0 15px rgba(128, 0, 128, 0.5)", 
    textShadow: "0 0 10px purple, 0 0 20px white" }}>"Build & Experiment with HTML, CSS, and JavaScript."</h1>
                  <br/>
                  <div style={{background:"none",height:"30rem",width:"60rem"}}>
                    


                    <Spline scene="https://prod.spline.design/SZLnaUj9fXl4vo6E/scene.splinecode" />
 </div>
                  </Col>
                  </Row>
                  </Container>
                 <br></br>
                  <Container style={{maxWidth: "500px", margin: "auto" }}>  
                 <br></br>
      <Row className="justify-content-center" style={{  display: "flex", gap: "25px",flexWrap: "nowrap" }}>
     
        {/* HTML Card */}
        <div
  style={{
    width: "10000rem",
    height: "250px",
    background: "#07182E",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: "20px",
    padding: "20px",
  }}
>
  {/* Animated Background */}
  <div
    style={{
      position: "absolute",
      width: "100px",
      height: "130%",
      backgroundImage:
        "linear-gradient(180deg, rgb(0, 183, 255), rgb(255, 48, 255))",
      transform: `rotate(${rotation}deg)`,
      transition: "all 0.2s linear",
    }}
  ></div>

  {/* Inner Card Content */}
  <h2
    style={{
      zIndex: 1,
      color: "white",
      fontSize: "2em",
      position: "relative",
      marginBottom: "10px",
    }}
  >
  HTML
  </h2>

  {/* Syntax Text */}
  <pre
    style={{
      zIndex: 1,
      color: "white",
      fontSize: "1em",
      position: "relative",
      textAlign: "center",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      padding: "5px",
      borderRadius: "5px",
    }}
  >
  {`<h1>
  Hello, World!
  </h1>`

   }
  </pre>

  {/* Inner Overlay */}
  <div
    style={{
      position: "absolute",
      inset: "5px",
      background: "#07182E",
      borderRadius: "15px",
    }}
  ></div>
</div>

        {/* CSS Card */}
        <div
  style={{
    width: "10000rem",
    height: "250px",
    background: "#07182E",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: "20px",
    padding: "20px",
  }}
>
  {/* Animated Background */}
  <div
    style={{
      position: "absolute",
      width: "100px",
      height: "130%",
      backgroundImage:
        "linear-gradient(180deg, rgb(0, 183, 255), rgb(255, 48, 255))",
      transform: `rotate(${rotation}deg)`,
      transition: "all 0.2s linear",
    }}
  ></div>

 
  <h2
    style={{
      zIndex: 1,
      color: "white",
      fontSize: "2em",
      position: "relative",
      marginBottom: "10px",
    }}
  >
    CSS
  </h2>

  
  <pre
    style={{
      zIndex: 1,
      color: "white",
      fontSize: "1em",
      position: "relative",
      textAlign: "center",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      padding: "5px",
      borderRadius: "5px",
    }}
  >
  {`h1 { color: red;
   font-size: 24px;
    }`
   }
  </pre>

  
  <div
    style={{
      position: "absolute",
      inset: "5px",
      background: "#07182E",
      borderRadius: "15px",
    }}
  ></div>
</div>
        <div
  style={{
    width: "10000rem",
    height: "250px",
    background: "#07182E",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: "20px",
    padding: "20px",
  }}
>
  {/* Animated Background */}
  <div
    style={{
      position: "absolute",
      width: "100px",
      height: "130%",
      backgroundImage:
        "linear-gradient(180deg, rgb(0, 183, 255), rgb(255, 48, 255))",
      transform: `rotate(${rotation}deg)`,
      transition: "all 0.2s linear",
    }}
  ></div>

  {/* Inner Card Content */}
  <h2
    style={{
      zIndex: 1,
      color: "white",
      fontSize: "2em",
      position: "relative",
      marginBottom: "10px",
    }}
  >
    JS
  </h2>

  {/* Syntax Text */}
  <p
    style={{
      zIndex: 1,
      color: "white",
      fontSize: "1em",
      position: "relative",
      textAlign: "center",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      padding: "5px",
      borderRadius: "5px",
    }}
  >
    console.log("Hello, World!");
  </p>

  {/* Inner Overlay */}
  <div
    style={{
      position: "absolute",
      inset: "5px",
      background: "#07182E",
      borderRadius: "15px",
    }}
  ></div>
</div>
      </Row>
    </Container>
    <div style={{ backgroundColor: "#2c003e", padding: "50px 0" }}>
      <h2 className="text-center text-white mb-4">What Our Users Say</h2>
      <div className="container">
        <Carousel indicators={false} controls={false} interval={3000}>
          {testimonials.map((testimonial, index) => (
            <Carousel.Item key={index}>
              <div className="text-center text-white">
                <p className="fs-5 fst-italic">"{testimonial.quote}"</p>
                <h5 className="fw-bold">- {testimonial.name}</h5>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
    </div>

                <div><br></br></div>
                <div
                style={{
                  position: "flex",
                  top: "15px",
                  right: "10px",
                  padding:"20px",
                  left:"40rem",
                  textAlign:"left",
                  display: "flex",
                  justifyContent:"right",
                  gap: "20px",
                }}
              >
                {/* <Button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600" href="Login" variant="primary">Login</Button> */}
                <a href="profile" style={{ textDecoration: "none", color: "purple" }} id="Profile">
    <FaUserCircle size={40} />
  </a>
                <Button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600" variant="outline-primary" href="/login" id="Logout" onClick={logout}>Logout</Button>
              </div>
                
           
          
      
      </>
        );
      };
      export default Home;
      
 





      
  

    

