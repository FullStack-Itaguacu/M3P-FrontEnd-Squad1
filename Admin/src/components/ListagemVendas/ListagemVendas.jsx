import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

function ListagemVendas() {
  const [vendas, setVendas] = useState([]);
  function getVendas() {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/sales/admin/", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setVendas(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getVendas();
  }, []);

  return (
    <Table striped bordered hover>
      {/* 
      Imagem do produto */}
      <thead>
        <tr>
          <th>ID</th>
          <th>Produto</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Valor Total </th>
          <th>Imagem</th>
        </tr>
      </thead>
      <tbody>
        {vendas.map((venda) => (
          <tr key={venda.id}>
            <td>{venda.id}</td>
            <td>{venda.product.name}</td>
            <td>{venda.amount_buy}</td>
            <td>{venda.product.unit_price}</td>
            <td>{venda.total}</td>
            <td>
              <img src={venda.product.image_link} alt="Imagem do produto" />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
export default ListagemVendas;
