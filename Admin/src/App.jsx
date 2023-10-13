import Header from "./components/Header/Header";
import { useContexto } from "./context/useContexto";
import Login from "./pages/Login/Login";

function App() {
  const { isLoggedin } = useContexto();

  return <>{isLoggedin ? <Header /> :  <Login />}</>;
}

export default App;
