import { Container, Row, Col } from 'react-bootstrap';
import styles from './FooterStyle.module.css';

function Footer() {
  return (
    <footer className={`bg-dark text-white ${styles.footerStyle}`}>
      <Container >
        <Row>
          <Col md={12} className='text-center pt-2'>
            <p>LAB365 | Floripa Mais Tec | Express Pharmacy &copy; {new Date().getFullYear()}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
