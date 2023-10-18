import CardProduto from "./CardProduto";
import { Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useContexto } from "../../context/useContexto";
import axios from "axios";
const compras = [
  {
    product_id: 1,
    amount_buy: 10,
  },
  {
    product_id: 5,
    amount_buy: 1,
  },
  {
    product_id: 6,
    amount_buy: 1,
  },
  {
    product_id: 2,
    amount_buy: 10,
  },
  {
    product_id: 4,
    amount_buy: 1,
  },
  {
    product_id: 8,
    amount_buy: 1,
  },
];

function FinalizarCompra({ pagamentoEscolhido, users_addresses_id }) {
  const { carrinho, setCarrinho } = useContexto();
  const [carro, setCarro] = useState([]);

  function calcularCompra() {
    const token = localStorage.getItem("token");
    const carro = [];
    compras.map((compra) => {
      axios
        .get(`http://localhost:3000/api/products/${compra.product_id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          const { data } = response;
          const { name, image_link, unit_price, total_stock } = data;
          const valorTotal = Number(unit_price) * Number(compra.amount_buy);

          carro.push({
            amount_buy: Number(compra.amount_buy),
            user_addresses_id: Number(users_addresses_id),
            type_payment: String(pagamentoEscolhido),
            name: name,
            image_link: image_link,
            total_stock: total_stock,
            valorTotal,
          });
          setCarrinho(carro.length);
          localStorage.setItem("quantidade_carrinho", carro.length);
          setCarro(carro);
        });
      console.log(carro);
    });
    localStorage.setItem("quantidade_carrinho", carro.length);
  }
  useEffect(() => {
    calcularCompra();
  }, [pagamentoEscolhido]);

  return (
    <Row>
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
  );
}

FinalizarCompra.propTypes = {
  pagamentoEscolhido: PropTypes.string.isRequired,
  users_addresses_id: PropTypes.number.isRequired,
};

export default FinalizarCompra;
