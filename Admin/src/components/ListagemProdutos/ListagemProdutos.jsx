import { useState, useEffect } from "react";
import axios from "axios";

import { Container, Card, Row, Col, Pagination } from "react-bootstrap";

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
    if (page > 0 && page <= totalPages) {
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
    <Container>
      {totalPages > 0 && (
        <Row>
          <Pagination >
            <span>Paginas</span>
            <Pagination.Prev onClick={handleBack} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={handleNext} />
          </Pagination>
        </Row>
      )}

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
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
}

export default ListagemProdutos;
