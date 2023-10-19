import CardProduto from "./CardProduto";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useContexto } from "../../context/useContexto";
import axios from "axios";

function FinalizarCompra({ pagamentoEscolhido, users_addresses_id }) {
  const {  setCarrinho } = useContexto();
  const [carro, setCarro] = useState([]);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    const comprasLocalStorage = JSON.parse(localStorage.getItem("carrinho"));
    comprasLocalStorage && setCarro(comprasLocalStorage);

    if (users_addresses_id !== -1 && pagamentoEscolhido !== "") {
      setDisable(false);
    } else {
      setDisable(true);
    }
  });



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
        console.log(compra);
        const { id, amount_buy } = compra;
        const response = await axios.get(
          `http://localhost:3000/api/products/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
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
        `http://localhost:3000/api/sales`,
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
          `${message}, valor total da compra: ${valor_total_da_compra}, quantidade de itens: ${pedido.length}`
        );
        localStorage.removeItem("quantidade_carrinho");
        localStorage.removeItem("carrinho");
        setCarrinho(null);
        setCarro([]);
        setDisable(true);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form onSubmit={(e) => comprar(e)}>
      <Row>
        <Col md={12}>
          <Button variant="primary" type="submit" disabled={disable}>
            Finalizar compra
          </Button>
        </Col>

        {carro.map((compra, index) => {
          return (
            <CardProduto
              key={index}
              image_link={compra.image_link}
              name={compra.name}
              amount_buy={compra.amount_buy}
              total={compra.valorTotal}
            />
          );
        })}
      </Row>
    </Form>
  );
}

FinalizarCompra.propTypes = {
  pagamentoEscolhido: PropTypes.string.isRequired,
  users_addresses_id: PropTypes.number.isRequired,
};

export default FinalizarCompra;
