import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importe useNavigate
import styles from "./NotFound.module.css";

function NotFound() {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault()
    navigate("/"); 
  };

  return (
    <Container className={styles.notFoundStyle}>
      <h3 className="text-center pt-4">Página não encontrada, clique no botão e faça Login novamente:</h3>
      <div className={`d-flex justify-content-center mt-4 ${styles.buttonStyle}`}>
        <Button          
          variant="primary"
          onClick={handleClick}
        >
          Voltar para o Login
        </Button>
      </div>
      <Row>
        <Col className={styles.centerImage}></Col>
      </Row>
    </Container>
  );
}

export default NotFound;