import { useRef, useEffect } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { useContexto } from "../../context/useContexto";

function FormularioCadastroProduto() {
  const refForm = useRef(null);

  const {
    formularioValidado,
    setFormularioValidado,
    handleSubmitProduto,
    handleLimpar,
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
      onSubmit={handleSubmitProduto}
    >
      <div className="d-flex justify-content-left">
        <h3 className= "m-3">Cadastro de Medicamento</h3>
      </div>
      <Row className="mb-3">
        <Form.Group as={Col} md="3" controlId="medicamento">
          <Form.Label>Medicamento</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nome do Medicamento"
          />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com nome do medicamento.
          </Form.Control.Feedback>{" "}
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="laboratorio">
          <Form.Label>Laboratório</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nome do laboratório"
          />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com nome do Laboratório.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="imagem">
          <Form.Label> Link da Imagem</Form.Label>
          <Form.Control
            required
            type="string"
            placeholder="https://link_to_image/image.jpg"
            step="0.01"
          />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com o Link da Imagem.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="quantidade">
          <Form.Label> Quantidade</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Quantidade"
            step="1"
          />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com a Quantidade .
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="3" controlId="dosagem">
          <Form.Label>Dosagem</Form.Label>
          <Form.Control required type="text" placeholder="Dosagem" />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com a Dosagem.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="unidade_dosagem">
          <Form.Label>Unidade Dosagem</Form.Label>
          <Form.Select required>
            <option value="">Selecione</option>
            <option value="mg">mg</option>
            <option value="mcg">mcg</option>
            <option value="g">g</option>
            <option value="mL">mL</option>
            <option value="%">%</option>
            <option value="Outro">Outro</option>
          </Form.Select>
          <Form.Control.Feedback>OK</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor selecione o tipo de dossagem.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="tipo">
          <Form.Label>Tipo de Medicamento</Form.Label>
          <Form.Select required>
            <option value="">Selecione</option>
            <option value="controlled">Controlado</option>
            <option value="uncontrolled"> Não Controlado</option>
          </Form.Select>
          <Form.Control.Feedback>OK</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor selecione o tipo de medicamento.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="valorUnitario">
          <Form.Label>Valor Unitário</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Valor Unitário"
            step="0.01"
          />
          <Form.Control.Feedback>OK</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor preencha este campo com o Valor Unitário.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="descricao">
          <Form.Label>Descrição</Form.Label>
          <Form.Control as="textarea" placeholder="Descrição" rows={8} />
          <Form.Control.Feedback>Opcional</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <div className="d-flex justify-content-end">
        <Button
          onClick={(e) => handleLimpar(e, refForm)}
          className="m-0"
          variant="outline-secondary"
          type="button"
        >
          Limpar
        </Button>
        <Button className="m-0" variant="outline-success" type="submit">
          Cadastrar
        </Button>
      </div>
    </Form>
  );
}
export default FormularioCadastroProduto;
