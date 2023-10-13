import Header from "./components/Header/Header";
import { useContexto } from "./context/useContexto";
import Login from "./pages/Login/Login";
import PaginaDashboard from "./pages/PaginaDashboard/PaginaDashboard";

function App() {
  const { isLoggedin } = useContexto();

  return <>{isLoggedin ? <Header /> :  <Login />}
  <PaginaDashboard />
  </>;
}

export default App;
