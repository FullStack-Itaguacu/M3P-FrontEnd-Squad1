import FormularioLogin from "../../components/FormularioLogin/FormularioLogin";
import { Row, Col, Container } from "react-bootstrap";
import styles from "./Login.module.css"

function Login() {
  return ( 
    <>
      <Container className={styles.loginStyle}> 
        <Row>
          <Col style={{
              backgroundImage: `url(/back1.svg)`,
              backgroundSize: "60%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left",
              height: "50vh",
              marginTop: "20vh"
            }} xs={6}>            
          </Col>
          <Col style={{
              backgroundImage: `url(/back2.svg)`,
              backgroundSize: "60%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right",
              height: "50vh",
              marginTop: "20vh"
            }} xs={6}>            
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

