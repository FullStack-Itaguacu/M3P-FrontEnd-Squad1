import { useState, useEffect } from "react";
import { useContexto } from "../../context/useContexto";
import {
  Container,
  Card,
  Row,
  Col,
  Pagination,
  Form,
  Button,
} from "react-bootstrap";
import {
  adicionarProdutoAoCarrinho,
  incrementarQuantidade,
  decrementarQuantidade,
} from "./utils/produtosUtils";

function ListagemProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [limit, setLimit] = useState(30);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState([0]);
  const [name, setName] = useState("");
  const [type_product, setType_product] = useState("");
  const [quantidades, setQuantidades] = useState({});

  const { buscarProdutos } = useContexto();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await buscarProdutos(
          setProdutos,
          setTotalPages,
          setPage,
          setName,
          setType_product,
          setLimit,
          name,
          type_product,
          page,
          limit
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [page, limit, name, type_product]);

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

  const handleIncrement = (produtoId) => {
    incrementarQuantidade(produtoId, quantidades, setQuantidades);
  };

  const handleDecrement = (produtoId) => {
    decrementarQuantidade(produtoId, quantidades, setQuantidades);
  };

  const adicionarAoCarrinho = (produto) => {
    const resultado = adicionarProdutoAoCarrinho(
      produto,
      quantidades[produto.id],
      quantidades
    );
    if (resultado.success) {
      alert(resultado.message);
    } else {
      alert(resultado.message);
    }
  };

  return (
    <>
      <h1 className="p-3">Medicamentos</h1>

      <Container
        fluid
        className=" m-2 p-2  border border-2 rounded-3 accordion"
      >
        <Row className="align-items-center ">
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

        <Row className="align-items-center justify-content-center">
          {produtos.length > 0 &&
            produtos.map((produto) => (
              <Card as={Col} md={2} className="p-3 m-2 h-100 " key={produto.id}>
                <Card.Body>
                  <Card.Title>{produto.name}</Card.Title>
                  <Card.Img
                    variant="top"
                    src={produto.image_link}
                    style={{ width: "100%" }}
                  />
                  <Card.Text>
                    <p>Preço unitário: R$ {produto.unit_price}</p>
                    <p>Estoque: {produto.total_stock}</p>
                  </Card.Text>
                </Card.Body>

                <Card.Footer className="mx-1">
                  <Form.Group controlId={`quantidade-${produto.id}`}>
                    <Form.Label>Quantidade</Form.Label>
                    <div className="d-flex">
                      <Button
                        className="btn btn-secondary m-1 hover link-opacity-75-hover"
                        onClick={() => handleDecrement(produto.id)}
                      >
                        -
                      </Button>
                      <div className="mx-1 m-1 p-2">
                        {quantidades[produto.id] || 0}
                      </div>
                      <Button
                        className="btn btn-warning m-1"
                        onClick={() => handleIncrement(produto.id)}
                      >
                        +
                      </Button>
                    </div>
                  </Form.Group>
                </Card.Footer>
                <button
                  className="btn  bg-danger text-light h-auto w-100 hover link-underline-dark-hover"
                  onClick={() => adicionarAoCarrinho(produto)}
                >
                  Adicionar ao Carrinho
                </button>
              </Card>
            ))}
        </Row>
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
      </Container>
    </>
  );
}

export default ListagemProdutos;
