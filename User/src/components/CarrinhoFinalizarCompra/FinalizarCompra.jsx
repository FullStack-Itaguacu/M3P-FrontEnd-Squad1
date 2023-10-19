import CardProduto from "./CardProduto";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useContexto } from "../../context/useContexto";
import axios from "axios";

function FinalizarCompra({ pagamentoEscolhido, users_addresses_id }) {
  const { setCarrinho, BASEURL, ENDPOINPRODUTOS, ENDPOINTPOSTSALES } =
    useContexto();
  const [carro, setCarro] = useState([]);
  const [disable, setDisable] = useState(true);
  const [dataCards, setDataCards] = useState([]);

  useEffect(() => {
    const comprasLocalStorage = JSON.parse(localStorage.getItem("carrinho"));
    comprasLocalStorage && setCarro(comprasLocalStorage);

    if (users_addresses_id !== -1 && pagamentoEscolhido !== "") {
      setDisable(false);
      if (carro.length > dataCards.length) {
        calcularCompra();
      }
    } else {
      setDisable(true);
    }
  }, [users_addresses_id, pagamentoEscolhido]);

  async function comprar(event) {
    event.preventDefault();
    if (carro.length === 0) {
      alert("Não há produtos para comprar");
      setDisable(true);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const precompra = [];

      for (let index = 0; index < carro.length; index++) {
        const compra = carro[index];
        const { id, amount_buy } = compra;
        const response = await axios.get(`${BASEURL}${ENDPOINPRODUTOS}${id}`, {
          headers: {
            Authorization: token,
          },
        });
        const { total_stock, image_link, name, unit_price } = response.data;
        const valorTotal = Number(unit_price) * Number(amount_buy);

        precompra.push({
          product_id: id,
          amount_buy: Number(amount_buy),
          users_addresses_id: Number(users_addresses_id),
          type_payment: String(pagamentoEscolhido),
          name: name,
          image_link: image_link,
          total_stock: total_stock,
          valorTotal,
        });

        if (total_stock < amount_buy) {
          alert(
            `O produto ${response.data.name} não tem estoque suficiente para a compra de ${amount_buy} unidades, Stock atual: ${total_stock}`
          );
          return;
        }
      }
      const responseCompra = await axios.post(
        `${BASEURL}${ENDPOINTPOSTSALES}`,
        precompra,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (responseCompra.status === 201) {
        const { message, valor_total_da_compra, pedido } = responseCompra.data;
        alert(
          `${message}, valor total da compra: ${valor_total_da_compra}, quantidade de pedidos: ${pedido.length}`
        );
        localStorage.removeItem("quantidade_carrinho");
        localStorage.removeItem("carrinho");
        setCarrinho(null);
        setCarro([]);
        setDisable(true);
        setDataCards([]);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function calcularCompra() {
    const data = [];
    for (let index = 0; index < carro.length; index++) {
      const compra = carro[index];
      const token = localStorage.getItem("token");
      const { id, amount_buy } = compra;

      const response = await axios.get(`${BASEURL}${ENDPOINPRODUTOS}${id}`, {
        headers: {
          Authorization: token,
        },
      });
      const { image_link, name, unit_price } = response.data;
      const total = Number(unit_price) * Number(amount_buy);
      data.push({ image_link, name, amount_buy, total , id});
    }
    setDataCards(data);
  }
  return (
    <Form onSubmit={(e) => comprar(e)}>
      <Row>
       

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {dataCards.map((compra, index) => (
              <tr key={index}>
                <td>{compra.id}</td>
       
                <td>
                   <img
                    src={compra.image_link}
                    alt={`Imagen de ${compra.name}`}
                    style={{ maxWidth: "50px" }}
                  />
                {`  ${compra.name}`}
                </td>
                <td>
                  <Row>
                    <Col>
                      <Button variant="secondary">-</Button>
                    </Col>
                    <Col>
                      <Button variant="ligth">{compra.amount_buy}</Button>
                    </Col>
                    <Col>
                      <Button variant="secondary">+</Button>
                    </Col>
                  </Row>
                </td>
                <td>{compra.total}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Row>
          <Button variant="primary" type="submit" disabled={disable}>
            Finalizar compra
          </Button>

          <Button
            variant="danger"
            type="submit"
            onClick={(e) => {
              e.preventDefault();

              localStorage.removeItem("carrinho");
              localStorage.removeItem("quantidade_carrinho");
              setCarro([]);
              setDataCards([]);
              setCarrinho(null);
            }}
          >
            Cancelar compra
          </Button>
        </Row>
      </Row>
    </Form>
  );
}

FinalizarCompra.propTypes = {
  pagamentoEscolhido: PropTypes.string.isRequired,
  users_addresses_id: PropTypes.number.isRequired,
};

export default FinalizarCompra;
