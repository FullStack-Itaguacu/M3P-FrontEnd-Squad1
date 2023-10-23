import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useContexto } from "./context/useContexto";
import RegistroUsuarios from "./pages/RegistroUsuarios/RegistroUsuarios";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import LoginHeader from "./components/LoginHeader/LoginHeader";
import Error from "./pages/Error/NotFound";
import PaginaDashboard from "./pages/PaginaDashboard/PaginaDashboard";
import CadastroProduto from "./pages/CadastroProduto/CadastroProduto";
import Vendas from "./pages/Vendas/Vendas";
import "./App.css";
import Footer from "./components/Footer/Footer";


function App() {
  const { isLoggedin, setIsLoggedin } = useContexto();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedin(false)
  }

  return (
    <>
      {isLoggedin ? (
        <BrowserRouter>
          <Header onLogout={handleLogout}>
            <Routes>
              {/* Rotas da aplicaçao quando usuario esta logado */}
              <Route path="/" element={<PaginaDashboard />} />
              <Route path="/registro-usuarios" element={<RegistroUsuarios />} />
              <Route path="/vendas" element={<Vendas />} />
              <Route path="/registro-produtos" element={<CadastroProduto />} />
              {/*Rota de erro quando nao existe a rota */}
              <Route path="*" element={<Error />} />
            </Routes>
          </Header>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <LoginHeader> 
            <Routes>
              {/* Rotas da aplicaçao quando usuario nao esta logado */}
              <Route path="/" element={<Login />} />
              <Route path="*" element={<Error />} />
            </Routes>            
          </LoginHeader>          
        </BrowserRouter>        
      )}
      <Footer />
    </>
  );
}

export default App;
