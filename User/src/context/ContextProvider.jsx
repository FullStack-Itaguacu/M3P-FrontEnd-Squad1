import { createContext } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
export const appContext = createContext();
import axios from "axios";


export function ContextProvider({ children }) {
  const [isLoggedin, setIsLoggedin] = useState(false);

  const BASEURL = "http://localhost:3000";
  const ENDPOINTLOGIN = "/api/user/login";  
  const ENDPOINTPOSTUSUARIO = "/api/user/signup";
  const ENDPOINPRODUTOS = "/api/products/";

  //função para validar senha
  function validaSenha(senha) {
    // este regex e para validar senha com pelo menos 8 caracteres, uma letra maiúscula e uma minuscula
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*\W)[a-zA-Z0-9\W]{8,}$/;

    if (!regex.test(senha)) {
      alert(
        "Senha incorreta, verificar se  possui 8 ou mais caracteres e se há pelo menos uma letra (maiúscula ou minúscula) na senha."
      );
    }
    return regex.test(senha);
  }
  //funçao para validar email
  function validaEmail(email) {
    // este regex e para validar email com domínio .com, .br, .net, etc
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!regex.test(email)) {
      alert(
        "Email incorreto, verificar se e um e-mail valido, ex: name@example.com"
      );
    }
    return regex.test(email);
  }

  const loginUser = async (email, password) => {
    if (!validaEmail(email)) {
      return;
    }
    if (!validaSenha(password)) {
      return;
    }

    axios
      .post(BASEURL + ENDPOINTLOGIN, {
        email,
        password,
      })
      .then((response) => {
        if (response) {
          const { status } = response;
          const token = response.data.data.token;
          if (status && status === 200) {
            localStorage.setItem("token", token);
            setIsLoggedin(true);
          }
        }
      })
      .catch((err) => {
        if (!err.response) {
          alert("# É raro, mais acontece o backend não respondeu! ");
          return;
        }
        const { message, cause, status, error } = err.response.data;
        alert(
          `# ${message} - Status: ${status} Causa : ${cause}  Erro: ${error}`
        );
      });
  };

// _______INICIO_função para buscar produtos_________
  function buscarProdutos(
    setProdutos,
    setTotalPages,
    setPage,
    setName,
    setType_product,
    setLimit,
    name,
    type_product,
    page,
    limit
  ) {
    const token = localStorage.getItem("token");

    axios
      .get(`${BASEURL}${ENDPOINPRODUTOS}${page}/${limit}`, {
        headers: {
          Authorization: token,
        },
        params: {
          name: name,
          type_product: type_product,
        },
      })
      .then((res) => {
        if (res && res.status === 200) {
          setProdutos(res.data.products);
          setTotalPages(res.data.total_pages);
          setPage(res.data.actual_page);

        } else {
          console.error("Erro ao buscar produtos:", res);
          errorMessage(res)
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });
  }
  function errorMessage(e){
    {<p className="text-danger">Erro ao buscar produtos.</p>
  }
    
  }
// _______FIM_função para buscar produtos_________

  const value = {
    isLoggedin,
    setIsLoggedin,
    buscarProdutos,
    loginUser,
    BASEURL,
    ENDPOINTPOSTUSUARIO,
    errorMessage,

  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
