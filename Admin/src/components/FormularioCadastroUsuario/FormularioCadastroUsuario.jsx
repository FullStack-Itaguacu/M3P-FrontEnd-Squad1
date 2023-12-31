import { useRef, useEffect } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { useContexto } from "../../context/useContexto";
import InputMask from "react-input-mask";

function FormularioCadastroUsuario() {
  const refForm = useRef(null);

  const {
    formularioValidado,
    setFormularioValidado,
    handleCadastrarUsuario,
    setTipoUsuario,
    tipoUsuario,
    handleBuscarEndereco,
    handleLimparCamposCadastroUsuario,
    cep,
    setCep,
    logradouro,
    setLogradouro,
    bairro,
    setBairro,
    cidade,
    setCidade,
    estado,
    setEstado,
    lat,
    setLat,
    long,
    setLong,
  } = useContexto();

  useEffect(() => {
    setFormularioValidado(false);
  }, []);

  return (
    <Form
      className="d-flex flex-column m-2 p-"
      ref={refForm}
      noValidate
      validated={formularioValidado}
      onSubmit={handleCadastrarUsuario}
    >
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
          <Form.Control
            required
            type="password"
            placeholder="Crie uma senha"
            autoComplete="on"
          />
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
        <Form.Group as={Col} md="4" controlId="type_user">
          <Form.Label>Tipo de Usuário</Form.Label>
          <Form.Control
            as="select"
            required
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="Admin">Administrador</option>
            <option value="Buyer">Usuário</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Por favor selecione um tipo de usuário.
          </Form.Control.Feedback>
        </Form.Group>
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
            placeholder="Avenida / Rua "
            value={logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com um logradouro válido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="number_street">
          <Form.Label>Número</Form.Label>
          <Form.Control required type="text" placeholder="Número" />
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com um número válido.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="complement">
          <Form.Label>Complemento</Form.Label>
          <Form.Control  type="text" placeholder="Complemento (opcional)" />
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
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="3" controlId="city">
          <Form.Label>Cidade</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="state">
          <Form.Label>Estado</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
         </Form.Group>
          <Form.Group as={Col} md="3" controlId="lat">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              type="number"
              placeholder="Latitude (opcional)"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              step={0.0000001}
            />
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="long">
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
        <Button
          className="m-3"
          variant="secondary"
          type="reset"
          onClick={handleLimparCamposCadastroUsuario}
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
