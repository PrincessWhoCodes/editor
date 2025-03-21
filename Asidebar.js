import React, { useState } from "react";
import { HiArrowCircleLeft } from "react-icons/hi";
import { FaSearchengin } from "react-icons/fa"; // FaSearchengin icon is imported but not used
import { motion } from "framer-motion";
import { Logo } from "../images"; // Ensure Logo is correctly imported from the right path
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { Container, Row, Col, Button, Image, Nav } from 'react-bootstrap';

const Asidebar = () => {
    const [isSideMenu, setIsSideMenu] = useState(false);

    return (
        <>
       <Container fluid className={`d-flex flex-column align-items-center justify-content-start gap-4 transition-all duration-200 ease-in-out ${isSideMenu ? "w-2" : "flex-[.2] xl:flex-[.2]"} bg-secondary px-3 py-6`} style={{ backgroundColor:"#000000",minHeight: '100vh', maxHeight: '100vh', position: 'relative' }}>
                

            <Row className="overflow-hidden w-100 flex-column gap-4">
                <Col sm={8} className="d-flex justify-content-center">
                    <Link to={"/dashboard"}>
                        <Image src={Logo} alt="logo" className="object-contain w-62 h-auto" />
                    </Link>
                </Col>
<br/><br/><br/><br/>
<Col className="px-6 py-3 flex items-center justify-center rounded-xl border border-purple-500 cursor-pointer transition-all duration-300 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/50">
    <Link to={"/dashboard"} className="w-full">
        <Button variant="outline-light" className="d-flex align-items-center justify-content-center w-100 text-purple-200 hover:bg-purple-600 hover:text-white transition-all duration-300">
            <span className="group-hover:text-white text-lg font-semibold">Dashboard</span>
        </Button>
    </Link>
</Col>
<br/>
<Col className="px-6 py-3 flex items-center justify-center rounded-xl border border-purple-500 cursor-pointer transition-all duration-300 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/50">
    <Link to={"/users"} className="w-full">
        <Button variant="outline-light" className="d-flex align-items-center justify-content-center w-100 text-purple-200 hover:bg-purple-600 hover:text-white transition-all duration-300">
            <span className="group-hover:text-white text-lg font-semibold">Manage Users</span>
        </Button>
    </Link>
</Col>
<br/>
<Col className="px-6 py-3 flex items-center justify-center rounded-xl border border-purple-500 cursor-pointer transition-all duration-300 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/50">
    <Link to={"/backup"} className="w-full">
        <Button variant="outline-light" className="d-flex align-items-center justify-content-center w-100 text-purple-200 hover:bg-purple-600 hover:text-white transition-all duration-300">
            <span className="group-hover:text-white text-lg font-semibold " >Backup Data</span>
        </Button>
    </Link>
</Col>
               
               
            </Row>
        </Container>
        </>
    );
}

export default Asidebar;
