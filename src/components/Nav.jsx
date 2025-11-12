// src/components/Nav.jsx
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav"; // Bootstrap Nav
import Navbar from "react-bootstrap/Navbar"; // Bootstrap Navbar

function AppNav() {
  // ← Changed from Nav to AppNav
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="#home">
          <strong>PlayBook</strong> Soccer Ball
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#bookings">My Bookings</Nav.Link>
            <Nav.Link href="#login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNav; // ← Export as AppNav
