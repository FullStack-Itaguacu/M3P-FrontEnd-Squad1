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

function FinalizarCompra({ pagamentoEscolhido, usser_addresses_id }) {
  const { carrinho,setCarrinho } = useContexto();
  const [carro, setCarro] = useState([]);

  function calcularCompra() {
    const token = localStorage.getItem("token");
    const carro = [];
    compras.map((compra) => {
      axios
        .get(`http://localhost:3000/api/products/${compra.product_id}`,{
            headers: {
                Authorization: token,
            },
        })
        .then((response) => {
            const { data } = response;
            console.log(data)
            const { name, image_link, unit_price, total_stock} = data;
            const valorTotal = Number(unit_price) * Number(compra.amount_buy);
            
            carro.push({
                amount_buy: Number(compra.amount_buy),
                usser_addresses_id: Number(usser_addresses_id),
                type_payment: String(pagamentoEscolhido),
                name : name,
                image_link : image_link,
                total_stock : total_stock,  
                valorTotal,
            });
            setCarrinho(carro.length);
            localStorage.setItem("quantidade_carrinho", carro.length);
            setCarro(carro);
        });

    });
    localStorage.setItem("quantidade_carrinho", carro.length);
  }
  useEffect(() => {
    calcularCompra();
  }, [pagamentoEscolhido, usser_addresses_id]);

  return (
    <Row>
      {carro.map((compra) => {
        return (
          <CardProduto
            key={compra.product_id}
            image_link={compra.image_link}
            name={compra.name}
            amount_buy={compra.amount_buy}
            total ={compra.valorTotal}
          />
        );
      })}
    </Row>
  );
}


FinalizarCompra.propTypes = {
  pagamentoEscolhido: PropTypes.string.isRequired,
  usser_addresses_id: PropTypes.number.isRequired,
};

export default FinalizarCompra;
