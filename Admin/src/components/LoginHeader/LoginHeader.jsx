import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css"

import styles from "./LoginHeader.module.css"
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";


function LoginHeader({ children }) {
  return (
    <>
      <Navbar expand={"lg"} className={styles.navbarHeader}>
        <Container fluid>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo1.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
          <Navbar.Brand href="#" className={styles.textLeft}>Express Pharmacy</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-false`} className={styles.toggleStyle} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand`}
            aria-labelledby={`offcanvasNavbarLabel-expand`}
            placement="end"
            style={{ backgroundColor: "rgb(9, 157, 27)", color: "white" }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                Express Pharmacy
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Link className={`nav-link text-light ${styles.navbarLink}`} to="/">
                  <i className="bi bi-github"></i>                 
                </Link>
                <Link className={`nav-link text-light ${styles.navbarLink}`} to="/">
                  <i className="bi bi-linkedin"></i>                
                </Link>
                <Link className={`nav-link text-light ${styles.navbarLink}`} to="/">
                  <i className="bi bi-whatsapp"></i>                 
                </Link>
                <Link className={`nav-link text-light ${styles.navbarLink}`} to="/">
                  <i className="bi bi-envelope-fill"></i>                
                </Link>
                <Link className={`nav-link text-light ${styles.navbarLink}`} to="/">
                  <i className="bi bi-instagram"></i>               
                </Link>                
                <Link className={`nav-link text-light ${styles.navbarLink}`} to="/">
                  <i className="bi bi-facebook"></i>                 
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

LoginHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginHeader;