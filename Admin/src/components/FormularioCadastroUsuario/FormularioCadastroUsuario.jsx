import React, { useRef, useEffect } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { useContexto } from "../../context/useContexto";

function FormularioCadastroUsuario() {
  const refForm = useRef(null);

  const {
    formularioValidado,
    setFormularioValidado,
    handleCadastrarUsuario,
    handleLimparCamposCadastroUsuario,
  } = useContexto();

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
        <h3 className="m-3">Cadastro de Usuário</h3>
      </div>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="formNomeCompleto">
          <Form.Label>Nome Completo</Form.Label>
          <Form.Control required type="text" placeholder="Nome Completo" />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com nome completo.
          </Form.Control.Feedback>{" "}
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formCpf">
          <Form.Label>CPF</Form.Label>
          <Form.Control required type="text" placeholder="000.000.000-00" />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com um CPF válido.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formTelefone">
          <Form.Label>Telefone</Form.Label>
          <Form.Control required type="text" placeholder="(00) 00000-0000" />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com um telefone válido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" placeholder="Email" />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com um email válido.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formSenha">
          <Form.Label>Senha</Form.Label>
          <Form.Control required type="password" placeholder="Senha" />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com uma senha válida.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formConfirmarSenha">
          <Form.Label>Confirmar Senha</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Confirmar Senha"
          />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com uma senha válida.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="formDataNascimento">
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control required type="date" placeholder="Data de Nascimento" />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com uma data de nascimento válida.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formCep">
          <Form.Label>CEP</Form.Label>
          <Form.Control required type="text" placeholder="00000-000" />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com um CEP válido.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formLogradouro">
          <Form.Label>Logradouro</Form.Label>
          <Form.Control required type="text" placeholder="Logradouro" />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com um logradouro válido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="formNumero">
          <Form.Label>Número</Form.Label>
          <Form.Control required type="text" placeholder="Número" />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com um número válido.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="formComplemento">
          <Form.Label>Complemento</Form.Label>
          <Form.Control required type="text" placeholder="Complemento" />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formBairro">
          <Form.Label>Bairro</Form.Label>
          <Form.Control required type="text" placeholder="Bairro" />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="formCidade">
          <Form.Label>Cidade</Form.Label>
          <Form.Control required type="text" placeholder="Cidade" />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="formEstado">
          <Form.Label>Estado</Form.Label>
          <Form.Control required type="text" placeholder="Estado" />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formTipoUsuario">
          <Form.Label>Tipo de Usuário</Form.Label>
          <Form.Control as="select">
            <option>Selecione</option>
            <option>Administrador</option>
            <option>Usuário</option>
          </Form.Control>
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
