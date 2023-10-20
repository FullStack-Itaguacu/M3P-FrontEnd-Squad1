import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useContexto } from "../../context/useContexto";
import axios from "axios";
import {
  adicionarProdutoAoCarrinho,
  incrementarQuantidade,
  decrementarQuantidade,
} from "./utils/finalizarCompra.utils";
import {useNavigate} from "react-router-dom"

function FinalizarCompra({ pagamentoEscolhido, users_addresses_id }) {
  const { setCarrinho, BASEURL, ENDPOINPRODUTOS, ENDPOINTPOSTSALES } =
    useContexto();
  const [carro, setCarro] = useState([]);
  const [disable, setDisable] = useState(true);
  const [quantidades, setQuantidades] = useState({});
  const [atualiza, setAtualiza] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const comprasLocalStorage = JSON.parse([localStorage.getItem("carrinho")]);

    for (let index = 0; index < comprasLocalStorage.length; index++) {
      if (carro.length === 0) {
        setCarro(JSON.parse(localStorage.getItem("carrinho")));
        return;
      }
      const amount_carro = carro[index].amount_buy;
      const amount_localstorage = comprasLocalStorage[index].amount_buy;
      console.log(`${amount_carro}`);
      console.log(`${amount_localstorage}`);

      amount_localstorage != amount_carro &&
        setCarro(JSON.parse(localStorage.getItem("carrinho")));
    }

    if (users_addresses_id !== -1 && pagamentoEscolhido !== "") {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [users_addresses_id, pagamentoEscolhido, carro, atualiza]);

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

        setCarrinho(null);
        setCarro([]);
        setDisable(true);
        localStorage.setItem("carrinho", "[]");
        navigate("/")
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleIncrement = (produtoId) => {
    incrementarQuantidade(produtoId, quantidades, setQuantidades);
  };

  const handleDecrement = (produtoId) => {
    decrementarQuantidade(produtoId, quantidades, setQuantidades);
  };

  const atualizarQuantidade = (produto) => {
    const resultado = adicionarProdutoAoCarrinho(
      produto,
      quantidades[produto.id],
      quantidades,
      setCarrinho
    );

    if (resultado.success) {
      alert(resultado.message);
      setQuantidades({});
    } else {
      alert(resultado.message);
    }
    setAtualiza(!atualiza);
  };
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
            {carro.length > 0 &&
              carro.map((compra, index) => (
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
                        <Button variant="ligth">{compra.amount_buy}</Button>
                      </Col>{" "}
                      <Col>
                        {" "}
                        <Button
                          variant="secondary"
                          onClick={() =>{ compra.amount_buy > 1 && handleDecrement(compra.id)}}
                        >
                          -
                        </Button>
                      </Col>
                      <Col>
                        <Button variant="info" disabled={true}>
                          {" "}
                          {quantidades[compra.id] }
                        </Button>
                      </Col>
                      <Col>
                        {" "}
                        <Button
                          className="btn btn-warning btn-sm me-1"
                          onClick={() => {handleIncrement(compra.id)}}
                        >
                          +
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant="success"
                          onClick={() => atualizarQuantidade(compra)}
                        >
                          Atualizar
                        </Button>
                      </Col>
                    </Row>
                  </td>
                  <td>{
                  compra.unit_price * compra.amount_buy
                  }</td>
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
              localStorage.setItem("carrinho", "[]");
              localStorage.removeItem("quantidade_carrinho");
              setCarro([]);
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
