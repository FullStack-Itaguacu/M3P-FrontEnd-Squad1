import { useState, useEffect } from "react";
import { Offcanvas, Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import { useContexto } from "../../context/useContexto";
import styles from "./Header.module.css";
import PropTypes from "prop-types";

function Header({ children, onLogout }) {
  const [userEmail, setUserEmail] = useState("");
  const { carrinho, setCarrinho } = useContexto();

  useEffect(() => {
    const email = localStorage.getItem("email");
    const quantidade_carrinho = localStorage.getItem("quantidade_carrinho");

    setCarrinho(quantidade_carrinho);
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
            />{" "}
          </Navbar.Brand>
          <Navbar.Brand href="#" className={styles.textLeft}>
            Express Pharmacy
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-false`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand`}
            aria-labelledby={`offcanvasNavbarLabel-expand`}
            placement="end"
            style={{ backgroundColor: "#888888" }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                Express Pharmacy
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Link
                  className={`nav-link text-light ${styles.navbarLink}`}
                  to="/"
                >
                  <i className="bi bi-box-seam-fill"></i>
                  Produtos
                </Link>
                <Link
                  className={`nav-link text-light ${styles.navbarLink}`}
                  to="/minhas-compras"
                >
                  <i className="bi bi-bag-check-fill"></i>
                  Minhas Compras
                </Link>
                <Link
                  className={`nav-link text-light ${styles.navbarLink}`}
                  to="/carrinho"
                >
                  <span style={{ color: "red" }}>
                    {carrinho && `${carrinho} `}
                  </span>
                  <i className="bi bi-cart4"></i>
                  Carrinho
                </Link>
                <Link
                  className={`nav-link text-light ${styles.navbarLink}`}
                  to="/nome-usuario"
                >
                  <i className="bi bi-person-fill"></i>
                  {userEmail}
                </Link>
                <Link
                  className={`nav-link text-light ${styles.navbarLink}`}
                  onClick={onLogout}
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
