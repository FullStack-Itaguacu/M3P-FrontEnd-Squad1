import { useEffect, useState } from "react";
import CardListaCompras from "./CardListaCompras";
import { Container, Row } from "react-bootstrap";
import axios from "axios";
import { useContexto } from "../../context/useContexto";
const ListaCompras = () => {
  const [listaCompras, setListaCompras] = useState([]);

  const { BASEURL, ENDPOINTLISTAVENDAS } = useContexto();

  const buscaVendas = async () => {
    const token = localStorage.getItem("token");
    await axios
      .get(BASEURL + ENDPOINTLISTAVENDAS, {
        headers: { Authorization: token },
      })
      .then((res) => {
        for (const compra of res.data) {
          const dataTimestamp = new Date(compra.created_at);

          const dia = dataTimestamp.getUTCDate();
          const mes = dataTimestamp.getUTCMonth() + 1;
          const ano = dataTimestamp.getUTCFullYear();
          const hora = dataTimestamp.getUTCHours();
          const minutos = dataTimestamp.getUTCMinutes();
          const segundos = dataTimestamp.getUTCSeconds();

          const dataPadronizada = `${dia}/${mes}/${ano} - ${hora}:${minutos}:${segundos}`;

          compra.created_at = dataPadronizada;
        }
        return res.data;
      })
      .then((res) => {
        if (res.datas !== undefined) {
          const datas = res.reduce((acumulador, compra) => {
            const data = compra.created_at;
            if (!acumulador[data]) {
              acumulador[data] = [];
            }
            acumulador[data].push(compra);
            return acumulador;
          }, {});
          const comprasAgrupadas = Object.entries(datas).map(
            ([data, compra]) => ({
              data,
              compra,
            })
          );
          setListaCompras(comprasAgrupadas);
        }
      });
  };

  useEffect(() => {
    buscaVendas();
  }, []);

  return (
    <Container className="p-3 pb-5">
      <h4 className="text-center p-3">Aqui você pode acompanhar todas as compras que já realizou na Express Pharmacy</h4>
      <Row className="justify-content-center">
        {listaCompras.length !== 0 ? (
          listaCompras.map((compras) => {
            return <CardListaCompras compras={compras} key={compras.id} />;
          })
        ) : (
          <h2 className="text-center">Não há registros de usuários</h2>
        )}
      </Row>
    </Container>
  );
};
export default ListaCompras;
