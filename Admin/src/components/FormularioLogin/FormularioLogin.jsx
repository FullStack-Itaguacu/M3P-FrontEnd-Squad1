import { useContexto } from "../../context/useContexto";

import { Container, Button, Form, Row, Col } from "react-bootstrap";

function FormularioLogin() {
  const { loginAadmin } = useContexto();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.elements["Login.email"].value;
    const senha = form.elements["Login.senha"].value;
    console.log(email, senha);
    await loginAadmin(email, senha);
  };

  return (
    <Container style={{ border: "2px #546469 solid" }}>
      <Row style={{ width: "100uvh" }}>
        <Col md={6}>
          <Form onSubmit={handleSubmit} style={{ width: "100uvh" }}>
            <Form.Text>Login</Form.Text>
            <Form.Group className="mb-3" controlId="Login.email">
              <Form.Label>Email </Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Login.senha">
              <Form.Label> Senha</Form.Label>
              <Form.Control type="password" placeholder="senha" required />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="primay" type="submit">
                Entrar
              </Button>
              <Button
                variant="secondary"
                onClick={() => console.log("Mostrar cadastro")}
              >
                Cadastrar
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default FormularioLogin;
