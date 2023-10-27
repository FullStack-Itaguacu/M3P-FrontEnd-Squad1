import FormularioLogin from "../../components/FormularioLogin/FormularioLogin";
import { Row, Col, Container } from "react-bootstrap";
import styles from "./Login.module.css"

function Login() {
  return ( 
    <>
      <Container className={styles.loginStyle}> 
        <Row>
          <Col className={styles.leftImage} xs={6}>            
          </Col>
          <Col className={styles.rightImage} xs={6}>            
          </Col>
        </Row>                 
        <Row className={`align-items-center justify-content-center ${styles.loginRow}`}>            
          <Col md={5} className="mx-auto d-flex align-items-center" style={{ height: '500px' }}>
            <FormularioLogin />
          </Col>
        </Row>        
      </Container>    
    </>  
  );
}

export default Login;

