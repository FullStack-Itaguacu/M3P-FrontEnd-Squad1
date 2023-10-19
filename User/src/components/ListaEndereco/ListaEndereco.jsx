import axios from "axios"
import { useEffect, useState } from "react"
import {
    Col,
    Container,
    Form,
    Row,
    FormControl,
    InputGroup,
} from "react-bootstrap"

function ListaEndereco() {
    const [enderecosUsuario, setEnderescoUsuario] = useState([])
    const [enderecoEntrega, setEnderecoEntrega] = useState("")
    const type_payment = [
        "credit_card",
        "debit_card",
        "payment_slip",
        "pix",
        "transfer",
    ];
    const [pagamentoEscolhido, setPagamentoEscolhido] = useState("")
    const BASEURL = "http://localhost:3000"
    const ENDPOINTLISTAENDERECOS = "/api/buyers/address"

    useEffect(() => {
        buscaEnderecoUsuario()
    }, [])

    const buscaEnderecoUsuario = () => {
        const token = localStorage.getItem("token")
        axios.get(BASEURL + ENDPOINTLISTAENDERECOS, {
            headers: { 'Authorization': token }
        })
            .then((res) => {
                setEnderescoUsuario(res.data)
            })
            .catch(errorResponse => {
                const { message, cause, status, error } = errorResponse.response.data;
                alert(
                    `# ${message} 
                    \nStatus: ${status} 
                    \nCausa : ${cause}
                    \nErro: ${error}`
                );
            })
    }

    function calcularCompra(compra) { }

    return (
        <Container>
            <h1>Finalizar Compra</h1>
            <p>Endereço de Entrega: {enderecoEntrega}</p>
            <p>Forma de Pagamento Escolhida: {pagamentoEscolhido}</p>
            <Row>
                <Form.Group as={Col}>
                    <Form.Label>Selecione o endereço de entrega:</Form.Label>
                    <Form.Control
                        as="select"
                        onClick={(e) => {
                            setEnderecoEntrega(e.target.value);
                        }}
                    >
                        <option value="">Selecione</option>
                        {enderecosUsuario.map((endereco) => (
                            < option
                                key={endereco.id}
                                value={`${endereco.street}, ${endereco.number_street} 
                                - CEP: ${endereco.zip} - ${endereco.city}, ${endereco.state}`
                                }
                            >
                                {`${endereco.street}, ${endereco.number_street} 
                                - ${endereco.city}, ${endereco.state}`}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Forma de Pagamento:</Form.Label>
                    <Form.Control
                        as="select"
                        onClick={(e) => {
                            setPagamentoEscolhido(e.target.value);
                        }}
                    >
                        <option value="">Selecione</option>
                        {type_payment.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
            </Row>
        </Container >
    )
}

export default ListaEndereco;