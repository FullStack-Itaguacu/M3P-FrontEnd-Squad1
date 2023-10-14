import { useState, useEffect } from "react";
import axios from "axios";

import {
  Navbar,
  Container,
  Nav,
  Card,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";

function ListagemProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [limit, setLimit] = useState(30);
  const [page, setPage] = useState(1);
  const [paginaAnterior, setPaginaAnterior] = useState([page - 1]);
  const [paginaSeguinte, setPaginaSeguinte] = useState([page + 1]);
  const [totalPages, setTotalPages] = useState([0]);

  useEffect(() => {
    buscarProdutos();
  }, [page]);

  function buscarProdutos() {
    const token = localStorage.getItem("token");
    const name = "Aspirina111111";
    const type_product = "controlled";

    axios
      .get(`http://localhost:3000/api/products/admin/${page}/${limit}`, {
        headers: {
          Authorization: token,
        },
        params: {
          name,
          type_product,
        },
      })
      .then((res) => {
        console.log(res);
        if (res && res.status === 200) {
          setProdutos(res.data.products);
          setTotalPages(res.data.total_pages);
          setPage(res.data.actual_page);
        }
      });
  }

  const handleBack = (e) => {
    e.preventDefault();
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const handleNext = (e) => {
    e.preventDefault();
    if (page >= 0 && page < totalPages) {
      setPage(page + 1);
    }
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Produtos cadastrados</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={handleBack}>Pagina Anterior </Nav.Link>
              <Nav.Link onClick={handleNext}>Pagina Siguiente</Nav.Link>
              <Nav.Link href="#link">Total de paginas: {totalPages}</Nav.Link>
              <Form className="d-flex">
                <h6>  Itens por pagina</h6>
                <Form.Control
                  type="number"
                  placeholder="Itens por pagina"
                  className="me-2"
                  aria-label="Itens por pagina"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  label="Itens por pagina"
                />
                <Button variant="outline-success" onClick={ buscarProdutos}>Buscar</Button>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row>
          {produtos.map((produto) => (
            <Card as={Col} md={3}>
              <Card.Body>
                <Card.Title>{produto.name}</Card.Title>
                <Card.Img
                  variant="top"
                  src={produto.image_link}
                  style={{ width: "100%" }}
                />
                <Card.Text>
                  <p>Preço unitario: {produto.unit_price}</p>
                  <p>Stock: {produto.total_stock}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default ListagemProdutos;
