import { useEffect, useState } from "react"
import CardsUsuario from "../../Cards/CardsUsuario/CardsUsuario"
import { Form, Col, Row, Button, Pagination, Container } from 'react-bootstrap';
import axios from 'axios'

function ListaUsuarios() {

    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    );
    const [users, setUsers] = useState([])
    const [nome, setNome] = useState("")
    const [ordem, setOrdem] = useState("ASC")
    const [limit, setLimit] = useState(20)
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState([0])

    const BASEURL = "http://localhost:3000";
    const ENDPOINTUSUARIOS = "/api/buyers/admin";

    const buscaUsuarios = async (page, limit, nome, ordem) => {
        setToken(localStorage.getItem("token"))
        await axios.get(`${BASEURL}${ENDPOINTUSUARIOS}/${page}/${limit}?full_name=${nome}&
        created_at=${ordem}`, {
            headers: { 'Authorization': token }
        })
            .then(res => {
                if (res && res.status === 200) {
                    setUsers(res.data.users);
                    setTotalPages(res.data.total_pages);
                    setPage(res.data.actual_page);
                }
            })
            .catch(error => alert(error))
    }

    useEffect(() => {
        buscaUsuarios(page, limit, nome, ordem)
    }, [page])

    const handleBack = (e) => {
        e.preventDefault();
        if (page > 1 && page <= totalPages) {
            setPage(page - 1);
        }
    };
    const handleNext = (e) => {
        e.preventDefault();
        if (page >= 0 && page < totalPages) {
            setPage(page + 1);
        }
    };

    const filtra = async () => {
        await buscaUsuarios(page, limit, nome, ordem)
    }

    return (
        <Container>
            <Form.Group as={Row} className="mb-3">
                <Col sm="3">
                    <Form.Control type="text" placeholder="Pesquisar" id="nome"
                        onChange={(e) => setNome(e.target.value)} />
                </Col>
                <Col sm="2">
                    <Form.Select aria-label="Tipo de usuário" id="ordem"
                        onChange={(e) => setOrdem(e.target.value)}
                    >
                        <option>Selecione...</option>
                        <option value="ASC">Crescente</option>
                        <option value="DESC">Decrescente</option>
                    </Form.Select>
                </Col>
                <Col sm="3">
                    <Form.Control
                        as="select" id="limit"
                        onChange={(e) => {
                            setLimit(e.target.value);
                            setPage(1);
                        }}
                    >
                        <option value="20">Produtos por pagina</option>
                        <option value="1">1</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </Form.Control>
                </Col>
                <Col sm="3">
                    <Pagination>
                        <Pagination.First onClick={() => setPage(1)} />
                        <Pagination.Prev onClick={handleBack} />
                        <Pagination.Item>{page}</Pagination.Item>
                        <Pagination.Ellipsis />
                        <Pagination.Item>{totalPages}</Pagination.Item>
                        <Pagination.Next onClick={handleNext} />
                        <Pagination.Last onClick={() => setPage(totalPages)} />
                    </Pagination>
                </Col>
                <Col sm="1">
                    <Button onClick={() => filtra()} variant="success">Pesquisar</Button>
                </Col>
            </Form.Group>

            <Row>
                {users.length > 0 ?
                    (
                        users.map((usuario) => {
                            return (
                                <CardsUsuario usuario={usuario} key={usuario.id} />
                            )
                        })
                    ) :
                    <h1>Teste</h1>
                }
            </Row>

        </Container>
    )
}

export default ListaUsuarios