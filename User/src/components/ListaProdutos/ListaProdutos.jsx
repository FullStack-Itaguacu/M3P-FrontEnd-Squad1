import { useState, useEffect } from "react";
import { useContexto } from "../../context/useContexto";
import { Container, Card, Row, Col, Pagination, Form } from "react-bootstrap";

function ListagemProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [limit, setLimit] = useState(30);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState([0]);
  const [name, setName] = useState("");
  const [type_product, setType_product] = useState("");
  const [noProductsMessage, setNoProductsMessage] = useState("");
  const [quantidade, setQuantidade] = useState(1);

  const { buscarProdutos} = useContexto();

  useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await buscarProdutos(
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
      
      if (data.length === 0) {
        setNoProductsMessage("Nenhum produto encontrado.");
        setTimeout(() => {
          setNoProductsMessage("");
        }, 3000);
      }
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

  const adicionarAoCarrinho = (produto) => {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const produtoNoCarrinho = carrinho.find((item) => item.id === produto.id);

    
    if (produtoNoCarrinho) {

      produtoNoCarrinho.quantidade += 1;
    } else {
      carrinho.push({ ...produto, quantidade: 1 });
    }


    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }
  return (
    <>
    <h2>Medicamentos</h2>
    <Container fluid className=" m-2 p-2  border border-2 rounded-3 accordion">
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

      <Row className="">
      <div>
        {/* Mensagem temporária quando nenhum produto é encontrado */}
      {noProductsMessage && <p className="text-danger">{noProductsMessage}</p>}
      </div>
        {produtos.length > 0 && produtos.map((produto) => (
          <Card as={Col} md={2} className="p-1 m-1" key={produto.id}>
            {/* Informações do Produto */}
            <Card.Body>
              <Card.Title>{produto.name}</Card.Title>
              <Card.Img variant="top" src={produto.image_link} />
              <Card.Text>
                <p>Preço unitário: {produto.unit_price}</p>
                <p>Estoque: {produto.total_stock}</p>
                {/* Adicionar mais informações conforme necessário */}
              </Card.Text>
            </Card.Body>

            {/* Botão de Adicionar ao Carrinho */}
            <Card.Footer className="col-12">
              <button onClick={() => adicionarAoCarrinho(produto)}>
                Adicionar ao Carrinho
              </button>
              <Form.Group controlId="quantidade">
                  <Form.Label>Quantidade</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    max={produto.quantidade}
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                  />
                </Form.Group>
            </Card.Footer>
          </Card>
        ))}
      </Row>
    </Container>
    </>
  );
}

export default ListagemProdutos;
