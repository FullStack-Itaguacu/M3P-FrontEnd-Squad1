import FormularioLogin from "../../components/FormularioLogin/FormularioLogin";
import { Row, Col, Container, Image } from "react-bootstrap";
import LoginHeader from "../../components/LoginHeader/LoginHeader";
import styles from "./Login.module.css";

function Login() {
  return (
    <>
      <LoginHeader /> 
      <div className={styles.loginStyle}>
        <Container className="justify-content-md-center">
          <Row style={{ height: "80vh" }} className="align-items-center">
            <Col md={4} className="mx-auto align-itens-center">
              <Image className={styles.imgStyle} src={"/logo.png"} fluid />
            </Col>
            <Col md={5} className="mx-auto align-items-center">
              <FormularioLogin  />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Login;
