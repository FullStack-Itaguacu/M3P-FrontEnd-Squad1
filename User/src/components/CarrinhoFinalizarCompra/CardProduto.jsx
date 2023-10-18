import { Card, Button, Col } from "react-bootstrap";
import PropTypes from "prop-types";
function CardProduto({ name, image_link, amount_buy, total}) {
  return (
    <Card as={Col} md={3}>
      <Card.Img variant="top" src={image_link} style={{ width: "100%" }} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          <strong>Quantidade :</strong> {amount_buy}
          <br />
          <strong>Valor total :</strong> {total}
        </Card.Text>
        <Button variant="primary">Botão</Button>
      </Card.Body>
    </Card>
  );
}

CardProduto.propTypes = {
    name: PropTypes.string.isRequired,
    image_link: PropTypes.string.isRequired,
    amount_buy: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
 
};

export default CardProduto;
