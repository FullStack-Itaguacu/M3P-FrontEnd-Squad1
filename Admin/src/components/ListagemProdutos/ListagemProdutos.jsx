import { useState, useEffect } from "react";
import axios from "axios";

import { Container, Card, Row, Col, Pagination, Form } from "react-bootstrap";

function ListagemProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [limit, setLimit] = useState(30);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState([0]);

  const [name, setName] = useState("");
  const [type_product, setType_product] = useState("");

  useEffect(() => {
    buscarProdutos();
  }, [page, limit, name, type_product]);

  function buscarProdutos() {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:3000/api/products/admin/${page}/${limit}`, {
        headers: {
          Authorization: token,
        },
        params: {
          name: name,
          type_product: type_product,
        },
      })
      .then((res) => {
        if (res && res.status === 200) {
          setProdutos(res.data.products);
          setTotalPages(res.data.total_pages);
          setPage(res.data.actual_page);
        }
        if (res && res.status === 204) {
          alert(
            "Nenhum produto encontrado com esses parametros de busqueda, vamos mostrar todos os produtos"
          );
          setName("");
          setType_product("");
          setLimit(30);
        }
      });
  }

  const handleBack = (e) => {
    e.preventDefault();
    if (page > 1 && page <= totalPages) {
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
    <Container fluid className=" m-2 p-3  border border-2 rounded-3 accordion">
      <Row>
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Nome do produto"
            onChange={(e) => setName(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Control
            as="select"
            onChange={(e) => {
              setType_product(e.target.value);
            }}
          >
            <option value="">Tipo de produto</option>
            <option value="controlled">Controlado</option>
            <option value="uncontrolled">Não Controlado</option>
          </Form.Control>
        </Col>

        <Col md={3}>
          <Form.Control
            as="select"
            onChange={(e) => {
              setLimit(e.target.value);
              setPage(1);
            }}
          >
            <option value="30">Produtos por pagina</option>
            <option value="1">1</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
          </Form.Control>
        </Col>
        <Col md={3}>
          <Pagination>
            <Pagination.First onClick={() => setPage(1)} />
            <Pagination.Prev onClick={handleBack} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Item>{totalPages}</Pagination.Item>
            <Pagination.Next onClick={handleNext} />
            <Pagination.Last onClick={() => setPage(totalPages)} />
          </Pagination>
        </Col>
      </Row>

      <Row>
        {produtos.map((produto) => (
          <Card as={Col} md={3} key={produto.id}>
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
                <p>Tipo : {produto.type_product}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
}

export default ListagemProdutos;
