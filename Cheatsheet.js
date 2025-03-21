import React from 'react';
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

const Cheatsheet = () => {
  return (
    <>
    <Usersidebar />
    
            <div className="w-100 h-64 overflow-y-scroll p-4 border border-purple-300 rounded-lg scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-purple-200" style={{  minHeight: "100vh",padding: "90px" ,width:"250vh" }}>

          
    <div>
    <h1 style={{    
    borderRadius: "20px", 
    color: "white", 
    padding: "10px 5px", 
    fontSize: "2rem", 
    fontWeight: "bold", 
    textAlign: "center", 
    boxShadow: "0 0 15px rgba(128, 0, 128, 0.5)", 
    textShadow: "0 0 10px purple, 0 0 20px white" }}>Cheatsheets</h1>
    </div>
<div >
    <br/><br/>
    <div className="text-center mt-4" style={{ color: "white", fontSize: "1.2rem" }}>
          <p>
            Explore our collection of cheatsheets for HTML, CSS, and JavaScript. 
            Each cheatsheet provides essential tips and quick references to help you 
            enhance your front-end development skills.
          </p>
         
        </div>
        <br/>
    <Container>
          <Row className="justify-content-center mb-4">
            <Col md={4}>
              <Card style={{ width: "18rem", background: "#6a0dad", color: "white", borderRadius: "15px", overflow: "hidden", position: "relative", border: "2px solid #a463f2" }} className="shadow-lg">
                <div className="position-absolute w-100 h-100" style={{ background: "radial-gradient(circle, rgba(162,93,220,0.4) 10%, rgba(106,13,173,0.8) 90%)", filter: "blur(20px)", top: "0", left: "0", zIndex: "0" }}></div>
                <Card.Body className="text-center position-relative" style={{ zIndex: "10" }}>
                  <Card.Title className="fw-bold fs-8" style={{ fontSize: "40px" }}>☆ HTML ☆ </Card.Title>
                  <Button variant="light" className="mt-3 rounded-circle" href={`${connstr}/editorbackend/cheatsheet/html.pdf`} target="_blank"
                    style={{ background: "#a463f2", border: "2px solid white", color: "white", width: "40vh", height: "50px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: "bold", transition: "all 0.3s ease-in-out", boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)" }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.2)";
                      e.target.style.boxShadow = "0 0 20px rgba(255, 255, 255, 0.8)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)";
                      e.target.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
                    }}
                  >
                    Learn More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Diagonal Cards */}
          <Row className="justify-content-center mb-4">
            <Col md={4} style={{ transform: 'translateY(-10px) translateX(60vh)' }}>
              <Card style={{ width: "18rem", background: "#6a0dad", color: "white", borderRadius: "15px", overflow: "hidden", position: "relative", border: "2px solid #a463f2" }} className="shadow-lg">
                <div className="position-absolute w-100 h-100" style={{ background: "radial-gradient(circle, rgba(162,93,220,0.4) 10%, rgba(106,13,173,0.8) 90%)", filter: "blur(20px)", top: "0", left: "0", zIndex: "0" }}></div>
                <Card.Body className="text-center position-relative" style={{ zIndex: "10" }}>
                  <Card.Title className="fw-bold fs-8" style={{ fontSize: "40px" }}>☆ CSS ☆ </Card.Title>
                  <Button variant="light" className="mt-3 rounded-circle" href={`${connstr}/editorbackend/cheatsheet/css.pdf`} target="_blank"
                    style={{ background: "#a463f2", border: "2px solid white", color: "white", width: "40vh", height: "50px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: "bold", transition: "all 0.3s ease-in-out", boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)" }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.2)";
                      e.target.style.boxShadow = "0 0 20px rgba(255, 255, 255, 0.8)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)";
                      e.target.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
                    }}
                  >
                    Learn More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} style={{ transform: 'translateY(20px) translateX(130vh)' }}>
              <Card style={{ width: "18rem", background: "#6a0dad", color: "white", borderRadius: "15px", overflow: "hidden", position: "relative", border: "2px solid #a463f2" }} className="shadow-lg">
                <div className="position-absolute w-100 h-100" style={{ background: "radial-gradient(circle, rgba(162,93,220,0.4) 10%, rgba(106,13,173,0.8) 90%)", filter: "blur(20px)", top: "0", left: "0", zIndex: "0" }}></div>
                <Card.Body className="text-center position-relative" style={{ zIndex: "10" }}>
                  <Card.Title className="fw-bold fs-8" style={{ fontSize: "40px" }}>☆ JS ☆ </Card.Title>
                  <Button variant="light" className="mt-3 rounded-circle" href={`${connstr}/editorbackend/cheatsheet/js.pdf`} target="_blank"
                    style={{ background: "#a463f2", border: "2px solid white", color: "white", width: "40vh", height: "50px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: "bold", transition: "all 0.3s ease-in-out", boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)" }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.2)";
                      e.target.style.boxShadow = "0 0 20px rgba(255, 255, 255, 0.8)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)";
                      e.target.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
                    }}
                  >
                    Learn More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

        </Container>
           </div>
       
    </div>
    </>
  )
}

export default Cheatsheet;