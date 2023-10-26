import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importe useNavigate
import styles from "./NotFound.module.css";

function NotFound() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/"); 
  };

  return (
    <Container className={styles.notFoundStyle}>
      <h3 className="text-center pt-5">Página não encontrada, clique no botão e faça Login novamente:</h3>
      <div className="d-flex justify-content-center mt-5">
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
