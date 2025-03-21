import React, { useState } from "react";
import { HiArrowCircleLeft } from "react-icons/hi";
import { FaSearchengin } from "react-icons/fa"; // FaSearchengin icon is imported but not used
import { motion } from "framer-motion";
import { Logo } from "../images"; // Ensure Logo is correctly imported from the right path
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { Container, Row, Col, Button, Image, Nav } from 'react-bootstrap';
import Header from "./Header";

const Usersidebar = () => {
    const [isSideMenu, setIsSideMenu] = useState(false);
    const [user, setUser] = useState(null); // user state is declared but not used

    return (
        <>
       
        <Container fluid className={`d-flex flex-column align-items-center justify-content-start gap-4 transition-all duration-200 ease-in-out ${isSideMenu ? "w-2" : "flex-[.2] xl:flex-[.2]"} bg-secondary px-3 py-6`} style={{ minHeight: '100vh', maxHeight: '100vh', position: 'relative' }}>
            <motion.div 
                whileTap={{ scale: 0.9 }} 
                onClick={() => setIsSideMenu(!isSideMenu)} 
                className="w-8 h-8 bg-secondary rounded-tr-lg rounded-br-lg" 
                style={{ position: 'absolute', right: '-24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
                <HiArrowCircleLeft className="text-white text-xl" />
            </motion.div>

            <Row className="overflow-hidden w-100 flex-column gap-4">
                <Col sm={8}className="d-flex justify-content-center">
                    <Link to={"/"}>
                        <Image src={Logo} alt="logo" className="object-contain w-62 h-auto" />
                    </Link>
                </Col>
               
                <br/>

                <Col className="px-6 py-3 flex items-center justify-center rounded-xl border border-gray-600 cursor-pointer group-hover:border-gray-50 hover:shadow-lg hover:shadow-purple-500/50">
                    <Link to={"/"}>
                        <Button variant="outline-secondary" className="d-flex align-items-center justify-content-center w-100 ">
                           
                            <span className="text-gray-300 group-hover:text-gray-50">Home</span>
                        </Button>
                    </Link>
                </Col>
                <br/>
                <Col className="px-6 py-3 flex items-center justify-center rounded-xl border border-gray-600 cursor-pointer group-hover:border-gray-50 hover:shadow-lg hover:shadow-purple-500/50">
                    <Link to={"/practice"}>
                        <Button variant="outline-secondary" className="d-flex align-items-center justify-content-center w-100">
                            <span className="text-gray-300 group-hover:text-gray-50">Practice</span>
                        </Button>
                    </Link>
                </Col>
                <br/>
                <Col className="px-6 py-3 flex items-center justify-center rounded-xl border border-gray-600 cursor-pointer group-hover:border-gray-50 hover:shadow-lg hover:shadow-purple-500/50">
                    <Link to={"/projects"}>
                        <Button variant="outline-secondary" className="d-flex align-items-center justify-content-center w-100">
                            <span className="text-gray-300 group-hover:text-gray-50">All Projects</span>
                        </Button>
                    </Link>
                </Col>
                <br/>
                <Col className="px-6 py-3 flex items-center justify-center rounded-xl border border-gray-600 cursor-pointer group-hover:border-gray-50 hover:shadow-lg hover:shadow-purple-500/50">
                    <Link to={"/collaboration"}>
                        <Button variant="outline-secondary" className="d-flex align-items-center justify-content-center w-100">
                            <span className="text-gray-300 group-hover:text-gray-50">Start Collaboration</span>
                        </Button>
                    </Link>
                </Col>
                <br/>
                <Col className="px-6 py-3 flex items-center justify-center rounded-xl border border-gray-600 cursor-pointer group-hover:border-gray-50 hover:shadow-lg hover:shadow-purple-500/50">
                    <Link to={"/cheatsheet"}>
                        <Button variant="outline-secondary" className="d-flex align-items-center justify-content-center w-100">
                            <span className="text-gray-300 group-hover:text-gray-50">CheatSheets</span>
                        </Button>
                    </Link>
                </Col>
                <br/>
                <Col className="px-6 py-3 flex items-center justify-center rounded-xl border border-gray-600 cursor-pointer group-hover:border-gray-50 hover:shadow-lg hover:shadow-purple-500/50">
                    <Link to={"/about"}>
                        <Button variant="outline-secondary" className="d-flex align-items-center justify-content-center w-100">
                            <span className="text-gray-300 group-hover:text-gray-50">About Us</span>
                        </Button>
                    </Link>
                </Col>
         
            </Row>
        </Container>
        
        </>
    );
}

export default Usersidebar;