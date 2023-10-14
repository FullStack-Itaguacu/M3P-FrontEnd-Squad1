import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

import PropTypes from 'prop-types';
import { Link } from "react-router-dom";


function Header({ children }) {
  return (
    <>
      <Navbar expand={"lg"} className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand href="#">Admin</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-false`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand`}
            aria-labelledby={`offcanvasNavbarLabel-expand`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                Admin
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Link className="nav-link" to="/">
                  Dashboard
                </Link>
                <NavDropdown
                  title="Mais opções"
                  id={`offcanvasNavbarDropdown-expand`}
                >
                  <Link className="nav-link" to="/">
                    Dashboard
                  </Link>
                  <NavDropdown.Divider />
                  <Link className="nav-link" to="/cadastro-usuario">
                   Cadastro de Usuário
                  </Link>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Item Buscado"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Buscar</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {children}
    </>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
