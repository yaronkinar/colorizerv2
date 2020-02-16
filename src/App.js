import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import ImageUpload from './Components/Upload'


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="#home">Colorizer</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>

            </Nav>

        </Navbar>
        <Container fluid>
            <Row>
                <Col>
                    <ImageUpload/>
                </Col>
            </Row>
        </Container>
    </div>
  );
}

export default App;
