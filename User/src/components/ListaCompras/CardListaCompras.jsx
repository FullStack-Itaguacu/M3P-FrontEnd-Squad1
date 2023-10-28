import { useState } from "react"
import { Button, Card, Container, Modal } from "react-bootstrap"

const CardListaCompras = ({ compras }) => {
    const { data,
        compra } = compras
    const [modal, setModal] = useState(false);

    let somaTotal = 0;
    for (let i = 0; i < compra.length; i++) {
        for (let compraIndividual in compra[i]) {
            if (compraIndividual === "total") {
                somaTotal += compra[i][compraIndividual];
            }
        }
    }

    return (
        <Card style={{ width: '16rem', margin: '8px' }}>
            <Card.Body>
                <Card.Text>
                    <p>Data e hora da compra: {data}
                    
                    </p>
                    <p>Total da Compra: R$ {somaTotal.toLocaleString('pt-br', { minimumFractionDigits: 2 })} 
                    </p>
                </Card.Text>
                <Button variant="primary" onClick={() => setModal(true)}>Detalhes</Button>
            </Card.Body>
            <Modal size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modal}
                onHide={() => setModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Detalhes da compra
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {compra.map((compraIndividual, index) => {
                        const product = compraIndividual.product
                        const user_address = compraIndividual.user_address
                        const address = user_address.address

                        return (
                            <Container>
                                <p>Id da compra: {compraIndividual.id}</p>
                                <img src={product.image_link} alt="Imagem do medicamento" />
                                <p>Quantidade comprada: {compraIndividual.amount_buy}</p>
                                <p>Total: R$ {compraIndividual.total.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</p>
                                <p>Endereço de entrega: {`${address.street},
                                    ${address.number_street} -
                                    ${address.zip} -
                                    ${address.city},
                                    ${address.state}`}
                                </p>
                                {index !== compra.length - 1 ? <hr /> : null}
                            </Container>
                        )
                    })}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setModal(false)}>Fechar</Button>
                </Modal.Footer>
            </Modal>
        </Card >
    )
}

export default CardListaCompras