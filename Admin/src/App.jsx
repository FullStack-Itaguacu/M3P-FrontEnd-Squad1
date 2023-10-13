import Header from "./components/Header/Header";
import { useContexto } from "./context/useContexto";
import Login from "./pages/Login/Login";
import PaginaDashboard from "./pages/PaginaDashboard/PaginaDashboard";

function App() {
  const { isLoggedin } = useContexto();

  if (isLoggedin) {
    return <>
      <Header />
      <PaginaDashboard />
    </>
  }

  return <>{isLoggedin ? <Header /> : <Login /> }
  
  </>;
}

export default App;
