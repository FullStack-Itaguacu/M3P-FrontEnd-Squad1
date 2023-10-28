import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Modal, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";
import { useContexto } from "../../context/useContexto";

function ModalEdicao({ produto }) {
  const { BASEURL, ENDPOINPRODUTOS } = useContexto();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState({
    id: produto.id,
    name: produto.name,
    dosage: produto.dosage,
    total_stock: produto.total_stock,
    image_link: produto.image_link,
  });

  function salvarAlteracoes(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const salvar = confirm(
      `Dejesa salvar as seguintes alterações do produto ?:
      \n Nome : ${data.name}
      \n Dosagem : ${data.dosage}
      \n Stock : ${data.total_stock}
      \n Link Imagem : ${data.image_link}
      `
      
    );
    setData({
      id: produto.id,
      name: event.target.elements["name"].value,
      dosage: event.target.elements["dosage"].value,
      total_stock: event.target.elements["total_stock"].value,
      image_link: event.target.elements["image_link"].value,
    });

    if (salvar) {
      axios
        .patch(
          `${BASEURL}${ENDPOINPRODUTOS}${data.id}`,
          {
            name: data.name,
            image_link: data.image_link,
            dosage: data.dosage,
            total_stock: data.total_stock,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          if (res && res.status === 204) {
            alert("Produto atualizado com sucesso");
            setShow(false);
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Erro ao atualizar produto");
        });
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Editar
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edite seu produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={salvarAlteracoes}>
            <Form.Group controlId="name">
              <Form.Label>Nome do produto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome do produto"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="dosage">
              <Form.Label>Dosagem</Form.Label>
              <Form.Control
                type="text"
                placeholder="dosagem"
                value={data.dosage}
                onChange={(e) => setData({ ...data, dosage: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="total_stock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="text"
                placeholder="Stock"
                value={data.total_stock}
                onChange={(e) =>
                  setData({ ...data, total_stock: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="image_link">
              <Form.Label>Imagem</Form.Label>
              <Form.Control
                type="text"
                placeholder="Imagem"
                value={data.image_link}
                onChange={(e) =>
                  setData({ ...data, image_link: e.target.value })
                }
              />
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Salvar
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

ModalEdicao.propTypes = {
  produto: PropTypes.object.isRequired,
};
export default ModalEdicao;
