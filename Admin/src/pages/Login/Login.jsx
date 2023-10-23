import { Row, Col, Container, Image } from "react-bootstrap";
import FormularioLogin from "../../components/FormularioLogin/FormularioLogin";
import styles from "./Login.module.css";

function Login() {
  return (
    <>             
      <Container className={styles.loginStyle}>
        <Row className="align-items-center justify-content-center">
          {/* <Col md={5} className="mx-auto d-flex align-items-center">
            <Image className={styles.imgStyle} src={"/logo.png"} style={{ height: '310px' }} />
          </Col> */}
          <Col md={5} className="mx-auto d-flex align-items-center" style={{ height: '500px' }}>
            <FormularioLogin />
          </Col>
        </Row>        
      </Container>      
    </>
  );
}

export default Login;
