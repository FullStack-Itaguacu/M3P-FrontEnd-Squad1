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
import { useNavigate } from "react-router-dom";

function FinalizarCompra({ pagamentoEscolhido, users_addresses_id }) {
  const { setCarrinho, BASEURL, ENDPOINPRODUTOS, ENDPOINTPOSTSALES } =
    useContexto();
  const [carro, setCarro] = useState([]);
  const [disable, setDisable] = useState(true);
  const [quantidades, setQuantidades] = useState({});
  const [atualiza, setAtualiza] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const comprasLocalStorage = JSON.parse([localStorage.getItem("carrinho")]);

    for (let index = 0; index < comprasLocalStorage.length; index++) {
      if (carro.length === 0) {
        setCarro(JSON.parse(localStorage.getItem("carrinho")));
        return;
      }
      const amount_carro = carro[index].amount_buy;
      const amount_localstorage = comprasLocalStorage[index].amount_buy;

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
    for (let index = 0; index < carro.length; index++) {
      const compra = carro[index];
      if (compra.amount_buy <= 0) {
        alert(
          `A quantidade do produto ${compra.name} não é válida para compra, remova o produto do carrinho ou atualize a quantidade`
        );
        return; // Não permita a compra se a quantidade for zero ou negativa
      }
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
        navigate("/");
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

  const calcularValorTotalFormatado = () => {
    let total = 0;
    for (let i = 0; i < carro.length; i++) {
      total += carro[i].unit_price * carro[i].amount_buy;
    }
    // Formatar o número usando toLocaleString
    return total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <Form style={{ width: "95%" }} onSubmit={(e) => comprar(e)}>
      <Row >
        <Table  striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
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
                          onClick={() => {
                            compra.amount_buy > 1 && handleDecrement(compra.id);
                          }}
                        >
                          -
                        </Button>
                      </Col>
                      <Col className="p-2">
                        <Button variant="info" disabled={true}>
                          {" "}
                          {quantidades[compra.id]}
                        </Button>
                      </Col>
                      <Col>
                        {" "}
                        <Button
                          className="btn btn-warning"
                          onClick={() => {
                            handleIncrement(compra.id);
                          }}
                        >
                          +
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => atualizarQuantidade(compra)}
                        >
                          Atualizar
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            const carrinhoString =
                              localStorage.getItem("carrinho");

                            if (carrinhoString && carrinhoString.length > 0) {
                              const carrinho = JSON.parse(carrinhoString);
                              const index = carrinho.findIndex(
                                (item) => item.id === compra.id
                              );
                              carrinho.splice(index, 1);
                              localStorage.setItem(
                                "carrinho",
                                JSON.stringify(carrinho)
                              );
                              setCarro(carrinho);
                              const novoTamanhoCarrinho = carrinho.length;
                              localStorage.setItem(
                                "quantidade_carrinho",
                                novoTamanhoCarrinho
                              );
                              if (novoTamanhoCarrinho < 1) {
                                setCarrinho(null);
                                localStorage.setItem(
                                  "quantidade_carrinho",
                                  null
                                );
                              } else {
                                setCarrinho(novoTamanhoCarrinho);
                                localStorage.setItem(
                                  "quantidade_carrinho",
                                  novoTamanhoCarrinho
                                );
                              }
                            } else {
                              console.error(
                                "Dados do carrinho no localStorage inválidos."
                              );
                            }
                          }}
                        >
                          Remover
                        </Button>
                      </Col>
                    </Row>
                  </td>
                  <td>
                    R${" "}
                    {compra.unit_price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Row className="mt-3 p-1">
          <Col>
            <h5>Valor Total da Compra: {calcularValorTotalFormatado()}</h5>
          </Col>
        </Row>
      </Row>
      <Row className="mt-3 p-1 justify-content-end">
        <Col className="d-flex">
          <div className="ms-auto">
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
              className="ms-2"
            >
              Cancelar compra
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
}

FinalizarCompra.propTypes = {
  pagamentoEscolhido: PropTypes.string.isRequired,
  users_addresses_id: PropTypes.number.isRequired,
};

export default FinalizarCompra;
