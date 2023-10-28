import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Row, Col } from "react-bootstrap";
import styles from "./Vendas.module.css";
import { useContexto } from "../../context/useContexto";

function ListagemVendas() {
  const [vendas, setVendas] = useState([]);
  const { BASEURL, ENDPOINTVENDAS } = useContexto();
  function getVendas() {
    const token = localStorage.getItem("token");
    axios
      .get(`${BASEURL}${ENDPOINTVENDAS}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        res && res.status === 200 && setVendas(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getVendas();
  }, []);

  return (
    <Container fluid className={`m-2 p-3  border border-2 rounded-3 ${styles.vendasStyle}`}>      
      <h3 className="text-center text-black p-2">Suas Vendas</h3>
      <p className="text-center text-black">Aqui você pode acompanhar todas as vendas realizadas até o momento:</p>
      <Row className=" justify-content-center">
        {vendas.map((venda) => (
          <Card as={Col} lg={3} md={6} xs={12} key={venda.id} style={{margin: "8px"}}>
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
