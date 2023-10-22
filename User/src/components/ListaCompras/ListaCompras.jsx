import { useEffect, useState } from "react"
import CardListaCompras from "./CardListaCompras"
import { Container, Row } from "react-bootstrap"
import axios from "axios"

const ListaCompras = () => {

    const [listaCompras, setListaCompras] = useState([])
    const BASEURL = "http://localhost:3000"
    const ENDPOINTLISTAVENDAS = "/api/sales"

    const buscaVendas = async () => {
        const token = localStorage.getItem("token")
        await axios.get(BASEURL + ENDPOINTLISTAVENDAS, {
            headers: { 'Authorization': token }
        })
            .then(res => {
                for (const compra of res.data) {
                    const dataTimestamp = new Date(compra.created_at)

                    const dia = dataTimestamp.getUTCDate();
                    const mes = dataTimestamp.getUTCMonth() + 1;
                    const ano = dataTimestamp.getUTCFullYear();
                    const hora = dataTimestamp.getUTCHours();
                    const minutos = dataTimestamp.getUTCMinutes();
                    const segundos = dataTimestamp.getUTCSeconds();

                    const dataPadronizada = `${dia}/${mes}/${ano} - ${hora}:${minutos}:${segundos}`

                    compra.created_at = dataPadronizada
                }
                return res.data
            }).then(res => {
                const datas = res.reduce((acumulador, compra) => {
                    const data = compra.created_at
                    if (!acumulador[data]) {
                        acumulador[data] = []
                    }
                    acumulador[data].push(compra)
                    return acumulador
                }, {})
                const comprasAgrupadas = Object.entries(datas).map(([data, compra]) => ({
                    data,
                    compra
                }))
                setListaCompras(comprasAgrupadas)
            })
    }

    useEffect(() => {
        buscaVendas()
    }, [])

    return (
        <Container>
            <Row>
                {listaCompras.length !== 0 ?
                    (
                        listaCompras.map((compras) => {
                            return (
                                <CardListaCompras compras={compras} key={compras.id} />
                            )
                        })
                    ) :
                    <h2>Não há dados para mostrar</h2>
                }
            </Row>

        </Container>
    )
}
export default ListaCompras