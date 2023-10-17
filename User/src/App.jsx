import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useContexto } from "./context/useContexto";

import Header from "./components/Header/Header"
import Login from "./pages/Login/Login"
import Error from "./pages/Error/NotFound"
import Produtos from "./pages/Produtos/Produtos"

function App() {
  const { isLoggedin } = useContexto();

    return <> { isLoggedin ?  
    <BrowserRouter>
        <Header >
        <Routes>
          {/* Rotas da aplicaçao quando usuario esta logado */}
          <Route path="/" element={<h1> Teste </h1>} />
          <Route path="/medicamentos" element={<Produtos />} />
  
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
    </BrowserRouter> } </>;  
}

export default App
