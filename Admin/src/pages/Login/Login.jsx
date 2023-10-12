import FormularioLogin from "../../components/FormularioLogin/FormularioLogin";
import { Row, Col, Container, Image } from "react-bootstrap";
function Login() {
  return (
    <Container className="justify-content-md-center">
      <Row style={{ height: "100vh" }} className="align-items-center">
        <Col md={6} className="mx-auto align-itens-center">
          <Image src={"/LogoLoginExample.jpg"} fluid />
        </Col>
        <Col md={6} className="mx-auto align-items-center">
          <FormularioLogin  />
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
