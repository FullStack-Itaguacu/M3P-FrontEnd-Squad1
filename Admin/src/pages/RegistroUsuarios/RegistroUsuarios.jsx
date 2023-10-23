import ListaUsuarios from "../../components/Listas/ListaUsuarios/ListaUsuarios";
import FormularioCadastroUsuario from "../../components/FormularioCadastroUsuario/FormularioCadastroUsuario";
import styles from "./Usuarios.module.css";

import { Tabs, Tab, Container } from "react-bootstrap";

function RegistroUsuarios() {
  return (
    // <section>
    //     <h2>Formulário de Cadastro</h2>
    //     <ListaUsuarios>Lista de usuários</ListaUsuarios>
    // </section>
    <Container className={styles.usuarioStyle}>
      <Tabs className="pt-4 border-light" defaultActiveKey="lista" id="fill-tab-example">
        <Tab className="pt-4 pb-4" eventKey="lista" title="Lista de usuários">
          <ListaUsuarios />
        </Tab>
        <Tab eventKey="cadastro" title="Cadastrar Usuario">
          <FormularioCadastroUsuario />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default RegistroUsuarios;
