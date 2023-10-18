import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useContexto } from "./context/useContexto";

import Header from "./components/Header/Header"
import Login from "./pages/Login/Login"
import Error from "./pages/Error/NotFound"
import CadastroUsuario from "./pages/CadastroUsuario/CadastroUsuario";
import Produtos from "./pages/Produtos/Produtos"
function App() {
  const { isLoggedin } = useContexto();

    return <> { isLoggedin ?  
    <BrowserRouter>
        <Header >
        <Routes>
          {/* Rotas da aplicaçao quando usuario esta logado */}
          <Route path="/" element={<Produtos />} />
          <Route path="/minhas-compras" element={<h1>Minhas compras</h1>} />
          <Route path="/carrinho" element={<h1>Carrinho de compras</h1>} />
          <Route path="/nome-usuario" element={<h1>Nome do usuário</h1>} />

          {/*Rota de erro quando nao existe a rota */}
          <Route path="*" element={<Error />} />
        </Routes>
        </Header>
    </BrowserRouter> :  
    <BrowserRouter>
        <Routes>
          {/* Rotas da aplicaçao quando usuario nao esta logado */}
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
          <Route path="*" element={<Error />} />
        </Routes>
    </BrowserRouter> } </>;  
}

export default App
