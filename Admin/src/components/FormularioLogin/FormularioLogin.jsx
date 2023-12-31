import { useContexto } from "../../context/useContexto";

import { Container, Button, Form, Row, Col, Stack } from "react-bootstrap";
import styles from "./Formulario.module.css";

function FormularioLogin() {
  const { loginAadmin } = useContexto();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.elements["Login.email"].value;
    const senha = form.elements["Login.senha"].value;
    await loginAadmin(email, senha);
  };

  return (
    <Container className={styles.loginForm}>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <div className={styles.textTitle}>Login Administrador</div>
            <Form.Group className="mb-3" controlId="Login.email">
              <Form.Label className="text-light">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@email.com"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Login.senha">
              <Form.Label className="text-light">Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="senha"
                autoComplete="on"
                required
              />
            </Form.Group>
            <Stack
              className="d-flex justify-content-center"
              direction="horizontal"
              gap={2}
            >
              <div className="mt-2">
                <Button variant="light" type="submit">
                  Entrar
                </Button>
              </div>
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default FormularioLogin;
