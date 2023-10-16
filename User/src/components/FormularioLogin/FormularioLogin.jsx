import { Container, Button, Form, Row, Col, Stack} from "react-bootstrap";
import "./formularioLogin.css"

function FormularioLogin() {
    return (
        <Container className="form">
            <Row>
                <Col>
                    <Form action="">
                        <div className="text-title">
                            Login
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="name@email.com" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" placeholder="Digite sua senha..." required />
                        </Form.Group>
                        <Stack className="d-flex justify-content-center" direction="horizontal" gap={2}>
                        <div className="mt-2">
                            <Button variant="light">Entrar</Button>                             
                        </div>                                         
                        <div className="mt-2">
                            <Button variant="light">Cadastrar</Button> 
                        </div>
                        </Stack>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default FormularioLogin;