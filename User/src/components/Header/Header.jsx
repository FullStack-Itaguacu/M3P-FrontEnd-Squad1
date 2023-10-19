import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import styles from "./Header.module.css"
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";


function Header({ children, onLogout }) {
  const [userEmail, setUserEmail] = useState(""); 

  useEffect(() => {
    const email = localStorage.getItem("email");

    setUserEmail(email);
  }, []);
  

  return (
    <>
      <Navbar expand={"lg"} className={styles.navbarHeader}>
        <Container fluid>
        <Navbar.Brand href="#home">
            <img
              alt="Logo Express Pharmacy"
              src="/logo1.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{' '}            
          </Navbar.Brand>
          <Navbar.Brand href="#" className={styles.textLeft}>Express Pharmacy</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-false`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand`}
            aria-labelledby={`offcanvasNavbarLabel-expand`}
            placement="end"
            style={{backgroundColor:"#888888"}}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                Express Pharmacy
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">   
              <Link className={`nav-link text-light ${styles.navbarLink}`} to="/produtos">
                  <i className="bi bi-bag"></i>
                  Produtos
                </Link>               
                <Link className={`nav-link text-light ${styles.navbarLink}`} to="/minhas-compras">
                  <i className="bi bi-bag"></i>
                  Minhas Compras
                </Link>
                <Link className={`nav-link text-light ${styles.navbarLink}`} to="/carrinho">
                  <i className="bi bi-cart"></i>
                  Carrinho
                </Link>
                <Link className={`nav-link text-light ${styles.navbarLink}`} to="/nome-usuario">
                  <i className="bi bi-person-circle"></i>
                  {userEmail}
                </Link>                                      
                <Link className={`nav-link text-light ${styles.navbarLink}`} onClick={onLogout} to="/">
                  <i className="bi bi-box-arrow-right"></i>
                  Sair
                </Link>
              </Nav>                            
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
  onLogout: PropTypes.func.isRequired,
};

export default Header;
