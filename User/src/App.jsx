import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useContexto } from "./context/useContexto";

import Header from "./components/Header/Header"
import Login from "./pages/Login/Login"
import Error from "./pages/Error/NotFound"
import CadastroUsuario from "./pages/CadastroUsuario/CadastroUsuario";
import Produtos from "./pages/Produtos/Produtos"
import CarroCompras from "./pages/CarroCompras/CarroCompras";
import MinhasCompras from "./pages/MinhasCompras/MinhasCompras";

function App() {
  const { isLoggedin, setIsLoggedin } = useContexto();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedin(false)
  }

  return <> {isLoggedin ?
    <BrowserRouter>
      <Header onLogout={handleLogout} >
        <Routes>
          {/* Rotas da aplicaçao quando usuario esta logado */}
          <Route path="/" element={<Produtos />} />
          <Route path="/minhas-compras" element={<MinhasCompras />} />
          <Route path="/carrinho" element={<CarroCompras />} />
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
    </BrowserRouter>} </>;
}

export default App
