import CardProduto from "./CardProduto";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useContexto } from "../../context/useContexto";
import axios from "axios";
const compras = [{ product_id: 10, amount_buy: 2 }];

function FinalizarCompra({ pagamentoEscolhido, users_addresses_id }) {
  const { setCarrinho } = useContexto();
  const [carro, setCarro] = useState([]);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    precompra();
    if (users_addresses_id !== -1 && pagamentoEscolhido !== "") {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [pagamentoEscolhido, users_addresses_id]);

  function precompra() {
    const token = localStorage.getItem("token");
    const precompra = [];
    compras.map((compra) => {
      axios
        .get(`http://localhost:3000/api/products/${compra.product_id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          const { data } = response;
          // console.log(data)
          const { name, image_link, unit_price, total_stock, id } = data;
          const valorTotal = Number(unit_price) * Number(compra.amount_buy);

          precompra.push({
            product_id: id,
            amount_buy: Number(compra.amount_buy),
            users_addresses_id: Number(users_addresses_id),
            type_payment: String(pagamentoEscolhido),
            name: name,
            image_link: image_link,
            total_stock: total_stock,
            valorTotal,
          });
          setCarrinho(precompra.length);
          localStorage.setItem("quantidade_carrinho", precompra.length);
          setCarro(precompra);
        });
    });
    localStorage.setItem("quantidade_carrinho", precompra.length);
  }

  async function comprar(event) {
    event.preventDefault();
    if (carro.length === 0) {
      alert("Não há produtos para comprar");
      setDisable(true);
      return;
    }
    try {
      const token = localStorage.getItem("token");

      for (let index = 0; index < carro.length; index++) {
        const compra = carro[index];
        const { product_id, amount_buy } = compra;
        const response = await axios.get(
          `http://localhost:3000/api/products/${product_id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const { total_stock } = response.data;

        if (total_stock < amount_buy) {
          alert(
            `O produto ${response.data.name} não tem estoque suficiente para a compra de ${amount_buy} unidades, Stock atual: ${total_stock}`
          );
          return;
        }
      }

      const responseCompra = await axios.post(
        `http://localhost:3000/api/sales`,
        carro,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (responseCompra.status === 201) {
        const{message, valor_total_da_compra, pedido} = responseCompra.data;
        alert(`${message}, valor total da compra: ${valor_total_da_compra}, quantidade de itens: ${pedido.length}`);
        localStorage.removeItem("quantidade_carrinho");
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
