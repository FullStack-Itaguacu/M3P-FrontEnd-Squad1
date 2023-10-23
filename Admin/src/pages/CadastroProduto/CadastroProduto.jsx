import FormularioCadastroProduto from "../../components/FormularioCadastroProduto/FormularioCadastroProduto";
import ListagemProdutos from "../../components/ListagemProdutos/ListagemProdutos";
import { Tabs, Tab, Container } from "react-bootstrap";
import styles from "./Produto.module.css";

function CadastroProduto() {
  return (
    <Container className={styles.produtoStyle}>
      <Tabs className="pt-4 border-light" defaultActiveKey="cadastro" id="fill-tab-example">
        <Tab eventKey="cadastro" title="Cadastro">
          <FormularioCadastroProduto />
        </Tab>
        <Tab eventKey="listar" title="Listar Produtos">
          <ListagemProdutos />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default CadastroProduto;
