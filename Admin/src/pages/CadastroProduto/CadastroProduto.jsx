import FormularioCadastroProduto from "../../components/FormularioCadastroProduto/FormularioCadastroProduto";
import ListagemProdutos from "../../components/ListagemProdutos/ListagemProdutos";
import { Tabs, Tab } from "react-bootstrap";

function CadastroProduto() {
  return (
    <Tabs defaultActiveKey="cadastro" id="fill-tab-example">
      <Tab eventKey="cadastro" title="Cadastro">
        <FormularioCadastroProduto />
      </Tab>
      <Tab eventKey="listar" title="Listar Produtos">
        <ListagemProdutos />
      </Tab>
    </Tabs>
  );
}

export default CadastroProduto;
