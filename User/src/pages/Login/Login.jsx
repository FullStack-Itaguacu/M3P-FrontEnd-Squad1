import FormularioLogin from "../../components/FormularioLogin/formularioLogin";
import { Row, Col, Container, Image } from "react-bootstrap";
import "./login.css"

function Login() {
  return ( 
    <div className="login">
    <Container className="justify-content-md-center">
    <Row style={{ height: "80vh" }} className="align-items-center">
        <Col md={4} className="mx-auto align-itens-center">
            <Image className="img" src={"/logo.png"} fluid />
        </Col>
        <Col md={5} className="mx-auto align-items-center">
            <FormularioLogin  />
        </Col>
    </Row>
    </Container>    
    </div>   
  );
}

export default Login;

