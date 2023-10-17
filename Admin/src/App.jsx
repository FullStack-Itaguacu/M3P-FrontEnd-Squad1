import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useContexto } from "./context/useContexto";
import RegistroUsuarios from "./pages/RegistroUsuarios/RegistroUsuarios"
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Error from "./pages/Error/NotFound";
import PaginaDashboard from "./pages/PaginaDashboard/PaginaDashboard";
import CadastroProduto from "./pages/CadastroProduto/CadastroProduto";
import Vendas from "./pages/Vendas/Vendas"


function App() {
  const { isLoggedin } = useContexto();

  return <>{isLoggedin ?
    <BrowserRouter>
      <Header >
      <Routes>
        {/* Rotas da aplicaçao quando usuario esta logado */}
        <Route path="/" element={<PaginaDashboard/>} />
        <Route path="/vendas" element={<Vendas/>} />
        <Route path="/registro-produtos" element={<CadastroProduto />} />
        <Route path="/registro-usuarios" element={<RegistroUsuarios />} />

          {/*Rota de erro quando nao existe a rota */}
          <Route path="*" element={<Error />} />
        </Routes>
      </Header>
    </BrowserRouter> :
    <BrowserRouter>
      <Routes>
        {/* Rotas da aplicaçao quando usuario nao esta logado */}
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>}</>;
}

export default App;