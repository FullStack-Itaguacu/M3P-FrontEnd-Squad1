import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap-icons/font/bootstrap-icons.css";

import styles from "./Header.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Header({ children, onLogout }) {
  const [userEmail, setUserEmail] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email");
    setUserEmail(email);
  }, []);

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <Navbar
        expand={"lg"}
        className={styles.navbarHeader}
        expanded={isMenuOpen}
        onToggle={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Container fluid>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo1.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>
          <Navbar.Brand href="#" className={styles.textLeft}>
            Express Pharmacy
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-false`}
            className={styles.toggleStyle}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand`}
            aria-labelledby={`offcanvasNavbarLabel-expand`}
            placement="end"
            style={{ backgroundColor: "rgb(9, 157, 27)", color: "white" }}
          >
            <Offcanvas.Header closeButton onHide={handleMenuClose}>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                Express Pharmacy
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Link
                  className={`nav-link text-light ${styles.navbarLink}`}
                  to="/"
                  onClick={handleMenuClose}
                >
                  <i className="bi bi-bar-chart-line"></i>
                  Dashboard
                </Link>
                <Link
                  className={`nav-link text-light ${styles.navbarLink}`}
                  to="/vendas"
                  onClick={handleMenuClose}
                >
                  <i className="bi bi-cash-coin"></i>
                  Vendas
                </Link>
                <Link
                  className={`nav-link text-light ${styles.navbarLink}`}
                  to="/registro-produtos"
                  onClick={handleMenuClose}
                >
                  <i className="bi bi-box-seam-fill"></i>
                  Produtos
                </Link>
                <Link
                  className={`nav-link text-light ${styles.navbarLink}`}
                  to="/registro-usuarios"
                  onClick={handleMenuClose}
                >
                  <i className="bi bi-people"></i>
                  Usuários
                </Link>
                <Link
                  className={`nav-link text-light ${styles.navbarLink}`}
                  to="/registro-usuarios"
                  onClick={handleMenuClose}
                >
                  <i className="bi bi-person-circle"></i>
                  {userEmail}
                </Link>
                <Link
                  className={`nav-link text-light ${styles.navbarLink}`}
                  onClick={() => {
                    handleMenuClose();
                    onLogout();
                  }}
                  to="/"
                >
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
