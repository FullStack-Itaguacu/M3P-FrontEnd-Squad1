import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useContexto } from "../../context/useContexto";
import FinalizarCompra from "../CarrinhoFinalizarCompra/FinalizarCompra";

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
  const [user_addresses_id, setUser_addresses_id] = useState(-1);

  const traducaoFormasPagamento = {
    credit_card: "Cartão de Crédito",
    debit_card: "Cartão de Débito",
    payment_slip: "Boleto Bancário",
    pix: "PIX",
    transfer: "Transferência Bancária",
  };

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
      setEnderecoEntrega("Selecione um endereço de entrega");
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
    <Container fluid className=" m-2 p-3  border border-2 rounded-3 accordion">      
      <h4 className="text-center pb-3">Finalize sua compra aqui e receba seu pedido no conforto da sua casa</h4>
      <Form.Group as={Col}>
        <Form.Label className="mb-3">
          <strong className="m-2">Endereço de Entrega: </strong>
          {enderecoEntrega} <br></br>
          <strong className="m-2"> Forma de Pagamento Escolhida: </strong>
          {traducaoFormasPagamento[pagamentoEscolhido]}
        </Form.Label>
        <Form.Label>

        </Form.Label>
      </Form.Group>
      <Row className="mb-4" style={{ width: "90%"}}>
        <Form.Group as={Col} >
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
              {traducaoFormasPagamento[type]}
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
