import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

import { useContexto } from "../../context/useContexto";
import FinalizarCompra from "../CarrinhoFinalizarCompra/FinalizarCompra";



function ListaEndereco() {
  const { BASEURL, ENDPOINTLISTAENDERECOS, setCarrinho } = useContexto();
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
  const [user_addresses_id, setUser_addresses_id] = useState(-1);

  useEffect(() => {
    buscaEnderecoUsuario();
  }, []);

  function setDataAdress(event) {
    event.preventDefault();

    try {
      const endereco = JSON.parse(event.target.value);
      const { street, number_street, city, state, users_addresses } = endereco;
      setUser_addresses_id(Number(users_addresses.users_addresses_id));
      setEnderecoEntrega(`${street}, ${number_street} - ${city}, ${state}`);
    } catch (error) {
      setEnderecoEntrega("Seleccione um endereço de entrega");
      setUser_addresses_id(-1);
      return;
    }
  }
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


  return (
    <Container fluid className=" m-2 p-3  border border-2 rounded-3 accordion">      <h1>Finalizar Compra</h1>
      <Form.Group as={Col}>
        <Form.Label>
          <strong>Endereço de Entrega: </strong>
          {enderecoEntrega}
          <strong> Forma de Pagamento Escolhida: </strong>
          {pagamentoEscolhido}
          <strong> User_Adress ID: </strong>
          {user_addresses_id}
        </Form.Label>
      </Form.Group>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Selecione endereço:</Form.Label>
          <Form.Control as="select" onClick={(e) => setDataAdress(e)}>
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
      <FinalizarCompra pagamentoEscolhido={pagamentoEscolhido} users_addresses_id={user_addresses_id}/>
    </Container>
  );
}

export default ListaEndereco;
