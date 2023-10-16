import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import personCircle from '../../../assets/personcircle.svg'
import { useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import axios from 'axios'

const CardsUsuario = ({ usuario }) => {

    const { id,
        full_name,
        email,
        cpf,
        phone,
        birth_date,
        type_user,
        created_by,
        createdAt,
        updatedAt } = usuario
    const [modal, setModal] = useState(false)
    const [nomeAtualizado, setNomeAtualizado] = useState(full_name)
    const [emailAtualizado, setEmailAtualizado] = useState(email)
    const [cpfAtualizado, setCpfAtualizado] = useState(cpf)
    const [foneAtualizado, setFoneAtualizado] = useState(phone)
    const [tipoAtualizado, setTipoAtualizado] = useState(type_user)
    const BASEURL = "http://localhost:3000";
    const ENDPOINTATUALIZAUSUARIO = "/api/buyers/admin";
    const token = localStorage.getItem("token") || null

    const geraMascaraCpf = (cpf) => {
        cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d)/, "$1.$2.$3-$4")
        return cpf
    }

    const geraMascaraFone = (fone) => {
        if (fone.lenght == 10) {
            fone = phone.replace(/^(\d{2})(\d{4})(\d)/, "($1) $2-$3")

        } else {
            fone = phone.replace(/^(\d{2})(\d{1})(\d{4})(\d)/, "($1) $2 $3-$4")
        }
        return fone
    }

    // Recebe um timestamp, transforma em um objeto data e reorganiza
    // no padrão DD/MM/AAAA
    const geraMascaraTimestamp = (timestamp) => {
        const data = new Date(timestamp)

        const dia = data.getUTCDate()
        const mes = data.getUTCMonth() + 1
        const ano = data.getUTCFullYear()

        const dataPadronizada = dia + "/" + mes + "/" + ano;

        return dataPadronizada
    }

    const cpfMascara = geraMascaraCpf(cpf)
    const foneMascara = geraMascaraFone(phone)
    const dataNascMascara = geraMascaraTimestamp(birth_date)
    const dataCadastroMascara = geraMascaraTimestamp(createdAt)
    const dataAtualizadoMascara = geraMascaraTimestamp(updatedAt)

    const atualizaDados = async (e) => {
        e.preventDefault()
        await axios.patch(`${BASEURL}${ENDPOINTATUALIZAUSUARIO}/${id}`,
            {
                full_name: nomeAtualizado,
                email: emailAtualizado,
                cpf: cpfAtualizado,
                phone: foneAtualizado,
                type_user: tipoAtualizado
            }, {
            headers: { 'Authorization': token }
        })
            .then(res => {
                if (res && res.status === 204) {
                    alert("Dados do usuário atualizado com sucesso!")
                }
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

    return (
        <>
            <Card style={{ width: '16rem', margin: '3px' }}>
                <Card.Img variant="top" src={personCircle} />
                <Card.Body>
                    <Card.Title>{full_name}</Card.Title>
                    <Card.Text>
                        CPF: {cpfMascara}
                    </Card.Text>
                    <Card.Text>
                        Email: {email}
                    </Card.Text>
                    <Card.Text>
                        Telefone: {foneMascara}
                    </Card.Text>
                    <Card.Text>
                        Data de Nascimento: {dataNascMascara}
                    </Card.Text>
                    <Button variant="primary" onClick={() => setModal(true)}>Editar</Button>
                </Card.Body>
            </Card >
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modal}
                onHide={() => setModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Dados do Usuário
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="nome">
                            <Form.Label column sm="3">Nome Completo</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" value={nomeAtualizado}
                                    onChange={(e) => setNomeAtualizado(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="email">
                            <Form.Label column sm="3">Email</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" value={emailAtualizado}
                                    onChange={(e) => setEmailAtualizado(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column htmlFor="cpf" sm="1">CPF</Form.Label>
                            <Col sm="5">
                                <Form.Control id="cpf" type="text" value={cpfAtualizado}
                                    onChange={(e) => setCpfAtualizado(e.target.value)} />
                            </Col>
                            <Form.Label column sm="1" htmlFor="fone">Telefone</Form.Label>
                            <Col sm="5">
                                <Form.Control type="text" id="fone" value={foneAtualizado}
                                    onChange={(e) => setFoneAtualizado(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="tipo">
                            <Form.Label column sm="3">Tipo de usuário</Form.Label>
                            <Col sm="9">
                                <Form.Select aria-label="Tipo de usuário"
                                    onChange={(e) => setTipoAtualizado(e.target.value)}
                                >
                                    <option>Selecione...</option>
                                    <option value="Buyer">Comprador</option>
                                    <option value="Admin">Administrador</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="dataNasc">
                            <Form.Label column sm="3">Data de Nascimento</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" value={dataNascMascara} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="criado">
                            <Form.Label column sm="3">Cadastrado em </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" value={dataCadastroMascara} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="tipo">
                            <Form.Label column sm="3">Atualizado em</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" value={dataAtualizadoMascara} disabled />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={(e) => atualizaDados(e)} variant="success"> Salvar</Button>
                    <Button onClick={() => setModal(false)} variant="danger"> Cancelar</Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}

export default CardsUsuario