import ListaUsuarios from "../../components/Listas/ListaUsuarios/ListaUsuarios";
import FormularioCadastroUsuario from "../../components/FormularioCadastroUsuario/FormularioCadastroUsuario";

import { Tabs, Tab } from "react-bootstrap";

function RegistroUsuarios() {
  return (
    // <section>
    //     <h2>Formulário de Cadastro</h2>
    //     <ListaUsuarios>Lista de usuários</ListaUsuarios>
    // </section>
    <Tabs defaultActiveKey="lista" id="fill-tab-example">
      <Tab eventKey="lista" title="Lista de usuários">
        <ListaUsuarios />
      </Tab>
      <Tab eventKey="cadastro" title="Cadastrar Usuario">
        <FormularioCadastroUsuario />
      </Tab>
    </Tabs>
  );
}

export default RegistroUsuarios;
