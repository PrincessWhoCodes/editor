import React, { useState } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        // Handle login logic here
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        // Handle logout logic here
        setIsLoggedIn(false);
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">YourLogo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        {isLoggedIn ? (
                            <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                        ) : (
                            <Button variant="outline-light" onClick={handleLogin}>Login</Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;