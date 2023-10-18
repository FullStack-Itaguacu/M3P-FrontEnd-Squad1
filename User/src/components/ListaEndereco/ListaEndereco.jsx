import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

import { useContexto } from "../../context/useContexto";

function ListaEndereco() {
  const { BASEURL, ENDPOINTLISTAENDERECOS } = useContexto();
  const [enderecosUsuario, setEnderescoUsuario] = useState([]);
  const [enderecoEntrega, setEnderecoEntrega] = useState("");
  const type_payment = [
    "credit_card",
    "debit_card",
    "payment_slip",
    "pix",
    "transfer",
  ];
  const [pagamentoEscolhido, setPagamentoEscolhido] = useState("");
  const [usser_addresses_id, setUsser_addresses_id] = useState("");

  useEffect(() => {
    buscaEnderecoUsuario();
  }, []);

  const buscaEnderecoUsuario = () => {
    const token = localStorage.getItem("token");
    axios
      .get(BASEURL + ENDPOINTLISTAENDERECOS, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setEnderescoUsuario(res.data);
      })
      .catch((errorResponse) => {
        const { message, cause, status, error } = errorResponse.response.data;
        alert(
          `# ${message} 
                    \nStatus: ${status} 
                    \nCausa : ${cause}
                    \nErro: ${error}`
        );
      });
  };

  function calcularCompra(compra) {}

  return (
    <Container>
      <h1>Finalizar Compra</h1>
      <p>Endereço de Entrega: {enderecoEntrega}</p>
      <p>Forma de Pagamento Escolhida: {pagamentoEscolhido}</p>
      <p>User_Adress ID {usser_addresses_id}</p>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Selecione o endereço de entrega:</Form.Label>
          <Form.Control
            as="select"
            onClick={(e) => {
              const endereco = JSON.parse(e.target.value);
              const { street, number_street, city, state, users_addresses } =
                endereco;
              setUsser_addresses_id(users_addresses.users_addresses_id);

              setEnderecoEntrega(
                `${street}, ${number_street} - ${city}, ${state}`
              );
            }}
          >
            <option value="">Selecione</option>
            {enderecosUsuario.map((endereco) => (
              <option key={endereco.id} value={JSON.stringify(endereco)}>
                {`${endereco.street}, ${endereco.number_street} 
                                - ${endereco.city}, ${endereco.state}`}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Forma de Pagamento:</Form.Label>
          <Form.Control
            as="select"
            onClick={(e) => {
              setPagamentoEscolhido(e.target.value);
            }}
          >
            <option value="">Selecione</option>
            {type_payment.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Row>
    </Container>
  );
}

export default ListaEndereco;
