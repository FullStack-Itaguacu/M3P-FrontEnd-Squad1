import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Row, Col } from "react-bootstrap";

function ListagemVendas() {
  const [vendas, setVendas] = useState([]);
  function getVendas() {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/sales/admin/", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setVendas(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getVendas();
  }, []);

  return (
    <Container fluid className=" m-2 p-3  border border-2 rounded-3">
      <Row>
        {vendas.map((venda) => (
          <Card as={Col} lg={3} md={6} xs={12} key={venda.id}>
            <Card.Img
              variant="top"
              src={venda.product.image_link}
              alt="Imagem do produto"
            />
            <Card.Body>
              <Card.Title>{venda.product.name}</Card.Title>
              <Card.Text>
                <strong>Cliente : </strong> {venda.buyer.email}
                <br />
                <strong>Quantidade Vendida: </strong> {venda.amount_buy}
                <br />
                <strong>Valor Unitario : </strong>{" "}
                {Number(venda.total / venda.amount_buy)}
                <br />
                <strong>Valor Total da venda: </strong> {venda.total}
                <br />
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
}
export default ListagemVendas;
