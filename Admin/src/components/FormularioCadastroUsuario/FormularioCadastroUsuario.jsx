import React, { useRef, useEffect, useState } from "react";
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
        <Form.Group as={Col} md="4" controlId="full_name">
          <Form.Label>Nome Completo</Form.Label>
          <Form.Control required type="text" placeholder="Nome Completo" />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com nome completo.
          </Form.Control.Feedback>{" "}
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="cpf">
          <Form.Label>CPF</Form.Label>
          <Form.Control required type="text" placeholder="000.000.000-00" />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com um CPF válido.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="phone">
          <Form.Label>Telefone</Form.Label>
          <Form.Control required type="text" placeholder="(00) 00000-0000" />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com um telefone válido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" placeholder="Email" />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com um email válido.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="password">
          <Form.Label>Senha</Form.Label>
          <Form.Control required type="password" placeholder="Crie uma senha" />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com uma senha válida.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="birth_date">
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control required type="date" placeholder="Data de Nascimento" />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com uma data de nascimento válida.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="type_user">
          <Form.Label>Tipo de Usuário</Form.Label>
          <Form.Control as="select">
            <option>Selecione</option>
            <option>Administrador</option>
            <option>Usuário</option>
          </Form.Control>
          <Form.Control.Feedback>OK</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor selecione um tipo de usuário.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="zip">
          <Form.Label>CEP</Form.Label>
          <Form.Control
            
            type="text"
            placeholder="00000-000"
          />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
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
          />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com um logradouro válido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="number_street">
          <Form.Label>Número</Form.Label>
          <Form.Control required type="text" placeholder="Número" />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com um número válido.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="complement">
          <Form.Label>Complemento</Form.Label>
          <Form.Control required type="text" placeholder="Complemento" />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="neighborhood">
          <Form.Label>Bairro</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Bairro"
          />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="3" controlId="city">
          <Form.Label>Cidade</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Cidade"
          />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="state">
          <Form.Label>Estado</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Estado"
          />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="lat">
          <Form.Label>Latitude</Form.Label>
          <Form.Control type="text" placeholder="Latitude (opcional)" />
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="long">
          <Form.Label>Longitude</Form.Label>
          <Form.Control type="text" placeholder="Longitude (opcional)" />
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
