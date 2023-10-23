import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import personCircle from "../../../assets/personcircle.svg";
import { useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import { useContexto } from "../../../context/useContexto";

const CardsUsuario = ({ usuario }) => {
  const {
    id,
    full_name,
    email,
    cpf,
    phone,
    birth_date,
    type_user,
    createdAt,
    updatedAt,
  } = usuario;

  const [modal, setModal] = useState(false);
  const [nomeAtualizado, setNomeAtualizado] = useState(full_name);
  const [emailAtualizado, setEmailAtualizado] = useState(email);
  const [cpfAtualizado, setCpfAtualizado] = useState(cpf);
  const [foneAtualizado, setFoneAtualizado] = useState(phone);
  const [tipoAtualizado, setTipoAtualizado] = useState(type_user);
  const { BASEURL, ENDPOINTATUALIZAUSUARIO } = useContexto();
  const token = localStorage.getItem("token") || null;

  const geraMascaraCpf = (cpf) => {
    cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d)/, "$1.$2.$3-$4");
    return cpf;
  };

  const geraMascaraFone = (fone) => {
    if (fone.lenght == 10) {
      fone = phone.replace(/^(\d{2})(\d{4})(\d)/, "($1) $2-$3");
    } else {
      fone = phone.replace(/^(\d{2})(\d{1})(\d{4})(\d)/, "($1) $2 $3-$4");
    }
    return fone;
  };

  // Recebe um timestamp, transforma em um objeto data e reorganiza
  // no padrão DD/MM/AAAA
  const geraMascaraTimestamp = (timestamp) => {
    const data = new Date(timestamp);

    const dia = data.getUTCDate();
    const mes = data.getUTCMonth() + 1;
    const ano = data.getUTCFullYear();

    const dataPadronizada = dia + "/" + mes + "/" + ano;

    return dataPadronizada;
  };

  const cpfMascara = geraMascaraCpf(cpf);
  const foneMascara = geraMascaraFone(phone);
  const dataNascMascara = geraMascaraTimestamp(birth_date);
  const dataCadastroMascara = geraMascaraTimestamp(createdAt);
  const dataAtualizadoMascara = geraMascaraTimestamp(updatedAt);

  const atualizaDados = async (e) => {
    e.preventDefault();
    await axios
      .patch(
        `${BASEURL}${ENDPOINTATUALIZAUSUARIO}/${id}`,
        {
          full_name: nomeAtualizado,
          email: emailAtualizado,
          cpf: cpfAtualizado,
          phone: foneAtualizado,
          type_user: tipoAtualizado,
        },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        if (res && res.status === 204) {
          alert("Dados do usuário atualizado com sucesso!");
        }
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
    <>
      <Card style={{ width: "16rem", margin: "3px" }}>
        <Card.Img variant="top" src={personCircle} />
        <Card.Body>
          <Card.Title>{full_name}</Card.Title>
          <Card.Text>ID: {id}</Card.Text>
          <Card.Text>CPF: {cpfMascara}</Card.Text>
          <Card.Text>Email: {email}</Card.Text>
          <Card.Text>Telefone: {foneMascara}</Card.Text>
          <Card.Text>Data de Nascimento: {dataNascMascara}</Card.Text>
          <Button variant="primary" onClick={() => setModal(true)}>
            Editar
          </Button>
        </Card.Body>
      </Card>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modal}
        onHide={() => setModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Dados do Usuário {full_name} ID: {id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="nome">
                <Form.Label>Nome Completo</Form.Label>
                <Form.Control
                  type="text"
                  value={nomeAtualizado}
                  onChange={(e) => setNomeAtualizado(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  value={emailAtualizado}
                  onChange={(e) => setEmailAtualizado(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="cpf">
                <Form.Label>CPF</Form.Label>
                <Form.Control
                  type="text"
                  value={cpfAtualizado}
                  onChange={(e) => setCpfAtualizado(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="fone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="text"
                  value={foneAtualizado}
                  onChange={(e) => setFoneAtualizado(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="tipo">
                <Form.Label>Tipo de usuário</Form.Label>
                <Form.Select
                  aria-label="Tipo de usuário"
                  onChange={(e) => setTipoAtualizado(e.target.value)}
                >
                  <option value={type_user}>Selecione...</option>
                  <option value="Buyer">Comprador</option>
                  <option value="Admin">Administrador</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="dataNasc">
                <Form.Label>Data de Nascimento</Form.Label>
                <Form.Control type="text" value={dataNascMascara} disabled />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="criado">
                <Form.Label>Cadastrado em </Form.Label>
                <Form.Control
                  type="text"
                  value={dataCadastroMascara}
                  disabled
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="tipo">
                <Form.Label>Atualizado em</Form.Label>
                <Form.Control
                  type="text"
                  value={dataAtualizadoMascara}
                  disabled
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={(e) => atualizaDados(e)} variant="success">
            Salvar
          </Button>
          <Button onClick={() => setModal(false)} variant="danger">
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

CardsUsuario.propTypes = {
  usuario: PropTypes.shape({
    id: PropTypes.number.isRequired,
    full_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    cpf: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    birth_date: PropTypes.number.isRequired,
    type_user: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    updatedAt: PropTypes.number.isRequired,
  }).isRequired,
};

export default CardsUsuario;
