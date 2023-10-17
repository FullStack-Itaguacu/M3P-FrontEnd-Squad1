import { useRef, useEffect, useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import InputMask from "react-input-mask";
import { useContexto } from "../../context/useContexto.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  validaCPF,
  validaTelefone,
  validaCEP,
  validaCampoObrigatorio,
  validaIdade,
  removeNonNumericCharacters,
  validaSenha,
  validaEmail,
} from "./utils/cadastro.usuarios.utils.jsx";

function FormularioCadastroUsuario() {
  const { BASEURL, ENDPOINTPOSTUSUARIO } = useContexto();
  const refForm = useRef(null);
  const navigate = useNavigate();
  const [formularioValidado, setFormularioValidado] = useState(false);

  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const handleCadastrarUsuario = (event) => {
    const form = event.currentTarget;
    let usuario;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setFormularioValidado(true);
    event.preventDefault();

    if (form.checkValidity() === true) {
      event.preventDefault();

      const emailValido = validaEmail(form.elements["email"].value);
      const senhaValida = validaSenha(form.elements["password"].value);
      const cpfValue = removeNonNumericCharacters(form.elements["cpf"].value);
      const cpfValido = validaCPF(cpfValue);
      const telefoneValue = removeNonNumericCharacters(
        form.elements["phone"].value
      );
      const telefoneValido = validaTelefone(telefoneValue);
      const cepValue = removeNonNumericCharacters(form.elements["zip"].value);
      const cepValido = validaCEP(cepValue);
      const nomeCompletoValido = validaCampoObrigatorio(
        form.elements["full_name"].value,
        "Nome completo"
      );
      const idadeValida = validaIdade(form.elements["birth_date"].value);

      // Se qualquer uma das validações falhar, pare o processamento e não envie os dados para o back-end
      if (
        !emailValido ||
        !senhaValida ||
        !cpfValido ||
        !telefoneValido ||
        !cepValido ||
        !nomeCompletoValido ||
        !idadeValida
      ) {
        return;
      }

      usuario = {
        user: {
          full_name: form.elements["full_name"].value,
          cpf: removeNonNumericCharacters(form.elements["cpf"].value),
          birth_date: form.elements["birth_date"].value,
          email: form.elements["email"].value,
          phone: removeNonNumericCharacters(form.elements["phone"].value),
          password: form.elements["password"].value,
          type_user: "Buyer",
        },
        address: [
          {
            zip: removeNonNumericCharacters(form.elements["zip"].value),
            street: form.elements["street"].value,
            number_street: form.elements["number_street"].value,
            neighborhood: form.elements["neighborhood"].value,
            city: form.elements["city"].value,
            state: form.elements["state"].value,
            complement: form.elements["complement"].value,
            lat: form.elements["lat"].value,
            long: form.elements["long"].value,
          },
        ],
      };

      axios
        .post(BASEURL + ENDPOINTPOSTUSUARIO, usuario)
        .then((response) => {
          const { message } = response.data;
          alert(`${message}`);
          navigate("/");

        })
        .catch((err) => {
          const { message, cause, status, error } = err.response.data;
          alert(
            `${message}\n \nCausa : ${cause} \nStatus Code : ${status} \nError : ${error}`
          );
        });

      setFormularioValidado(false);
      setCep("");
      setLogradouro("");
      setBairro("");
      setCidade("");
      setEstado("");
      setLat("");
      setLong("");
      event.target.reset();

    }
  };

  const handleLimparCamposCadastroUsuario = (event, ref) => {
    event.preventDefault();
    setCep("");
    setLogradouro("");
    setBairro("");
    setCidade("");
    setEstado("");
    setLat("");
    setLong("");
    ref.current.reset();
  };
  //função para buscar endereço pelo cep
  const handleBuscarEndereco = (e) => {
    const { value } = e.target;
    const cep = value?.replace(/\D/g, "");

    if (cep?.length !== 8) {
      return;
    }
    fetch(`https://brasilapi.com.br/api/cep/v2/{${cep}}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.erro) {
          alert("CEP não encontrado");
          return;
        }
        setLogradouro(data.street);
        setCidade(data.city);
        setEstado(data.state);
        setBairro(data.neighborhood);
        setLat(data.location.coordinates.latitude);
        setLong(data.location.coordinates.longitude);
      });
  };
  useEffect(() => {
    setFormularioValidado(false);
  }, []);

  return (
    <Form
      className="d-flex flex-column m-3 p-5"
      ref={refForm}
      noValidate
      validated={formularioValidado}
      onSubmit={handleCadastrarUsuario}
    >
      <div className="d-flex justify-content-left">
        <h3 className="m-3">Registro de um novo Usuário</h3>
      </div>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="full_name">
          <Form.Label>Nome Completo</Form.Label>
          <Form.Control required type="text" placeholder="Nome Completo" />
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com nome completo.
          </Form.Control.Feedback>{" "}
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="cpf">
          <Form.Label>CPF</Form.Label>
          <Form.Control
            required
            as={InputMask}
            mask="999.999.999-99"
            type="text"
            placeholder="000.000.000-00"
          />
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com um CPF válido.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="phone">
          <Form.Label>Telefone/Celular</Form.Label>
          <Form.Control
            required
            as={InputMask}
            mask="(99) 99999-9999"
            type="text"
            placeholder="(00) 00000-0000"
          />
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com um telefone válido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="exemplo@exemplo.com"
          />
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com um email válido.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="password">
          <Form.Label>Senha</Form.Label>
          <Form.Control required type="password" placeholder="Crie uma senha" />
          <Form.Control.Feedback>
            {refForm.current &&
            refForm.current.elements["password"].value.length >= 8
              ? "OK"
              : "Senha deve ter no mínimo 8 caracteres."}
          </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com uma senha válida.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="birth_date">
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control required type="date" placeholder="Data de Nascimento" />
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com uma data de nascimento válida.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="zip">
          <Form.Label>CEP</Form.Label>
          <Form.Control
            required
            as={InputMask}
            mask="99999-999"
            type="text"
            placeholder="00000-000"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            onBlur={handleBuscarEndereco}
          />
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com um CEP válido.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="street">
          <Form.Label>Logradouro</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Avenida / Rua / Servidão ..."
            value={logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com um logradouro válido.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="number_street">
          <Form.Label>Número</Form.Label>
          <Form.Control required type="number" placeholder="Número" />
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com um número válido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="complement">
          <Form.Label>Complemento</Form.Label>
          <Form.Control required type="text" placeholder="Complemento" />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="neighborhood">
          <Form.Label>Bairro</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Bairro"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="city">
          <Form.Label>Cidade</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="state">
          <Form.Label>Estado</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="lat">
          <Form.Label>Latitude</Form.Label>
          <Form.Control
            type="number"
            placeholder="Latitude (opcional)"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            step={0.0000001}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="long">
          <Form.Label>Longitude</Form.Label>
          <Form.Control
            type="number"
            placeholder="Longitude (opcional)"
            value={long}
            onChange={(e) => setLong(e.target.value)}
            step={0.0000001}
          />
        </Form.Group>
      </Row>
      <div className="d-flex justify-content-end">
        <Button variant="light" onClick={() => navigate("/")}>
          Voltar para Login
        </Button>
        <Button
          className="m-3"
          variant="secondary"
          type="reset"
          onClick={(e) => handleLimparCamposCadastroUsuario(e, refForm)}
        >
          Limpar
        </Button>

        <Button className="m-3" variant="primary" type="submit">
          Cadastrar
        </Button>
      </div>
    </Form>
  );
}

export default FormularioCadastroUsuario;
