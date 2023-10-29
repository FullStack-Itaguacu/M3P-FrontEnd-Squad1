import ListaUsuarios from "../../components/Listas/ListaUsuarios/ListaUsuarios";
import FormularioCadastroUsuario from "../../components/FormularioCadastroUsuario/FormularioCadastroUsuario";
import styles from "./Usuarios.module.css";

import { Tabs, Tab, Container } from "react-bootstrap";

function RegistroUsuarios() {
  return (
    <Container className={styles.usuarioStyle}>
      <h3 className="text-center text-black pt-4">Cadastre novos usuários ou veja a lista de usuários já cadastrados</h3>
      <Tabs className="pt-4 border-light" defaultActiveKey="lista" id="fill-tab-example">
        <Tab eventKey="cadastro" title="Cadastrar Usuario">
          <FormularioCadastroUsuario />
        </Tab>
        <Tab className="pt-4 pb-4" eventKey="lista" title="Lista de usuários">
          <ListaUsuarios />
        </Tab>

      </Tabs>
    </Container>
  );
}

export default RegistroUsuarios;
