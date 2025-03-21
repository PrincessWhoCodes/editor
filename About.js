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




const About = () => {
  return (
    <>
    <Usersidebar />
     
    
  
      
      
            {/* Main Content Area */}
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
    textShadow: "0 0 10px purple, 0 0 20px white" }}>About Us</h1>
    </div>
    <div style={{
       // Dark background for contrast
      color: '#f8f8f2', // Light text color
      padding: '40px',
      borderRadius: '10px',
      textAlign: 'center',
    //   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
    }}>
     

      <section style={{
        margin: '15px 0',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        boxShadow: '0 2px 15px rgba(0, 0, 0, 0.2)',
      }}>
        <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
          Welcome to VioletCode! We provide a user-friendly code editor that empowers everyone to code seamlessly. Our mission is to help you bring your creative ideas to life with ease.
        </p>
      </section>

      <section style={{
        margin: '15px 0',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        boxShadow: '0 2px 15px rgba(0, 0, 0, 0.2)',
      }}>
        <h3 style={{ marginBottom: '10px', fontSize: '1.5rem' }}>Our Story</h3>
        <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
          Founded by a team of passionate developers, VioletCode simplifies coding by combining powerful features with an intuitive interface, making it accessible to all.
        </p>
      </section>

      <section style={{
        margin: '15px 0',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        boxShadow: '0 2px 15px rgba(0, 0, 0, 0.2)',
      }}>
        <h3 style={{ marginBottom: '10px', fontSize: '1.5rem' }}>What We Offer</h3>
        <ul style={{ textAlign: 'left', lineHeight: '1.6', fontSize: '1.1rem' }}>
          <li>Support for HTML, CSS, and JavaScript with real-time previews.</li>
          <li>User-friendly interface designed for efficiency.</li>
          <li>Collaboration tools for real-time project sharing.</li>
          <li>Access to extensive tutorials and coding resources.</li>
        </ul>
      </section>

      <section style={{
        margin: '15px 0',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        boxShadow: '0 2px 15px rgba(0, 0, 0, 0.2)',
      }}>
        <h3 style={{ marginBottom: '10px', fontSize: '1.5rem' }}>Join Us</h3>
        <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
          Whether you're a beginner or an experienced coder, dive into VioletCode and elevate your coding experience!
        </p>
      </section>
    </div>
    </div>
    </>
  )
}

export default About;