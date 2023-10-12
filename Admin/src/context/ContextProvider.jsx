import { createContext } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
// import axios from "axios";
export const appContext = createContext();

import axios from "axios";

export function ContextProvider({ children }) {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const BASEURL = "http://localhost:3333";
  const ENDPOINTLOGIN = "/api/admin/login";

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

  const loginAadmin = async (email, senha) => {
    if (!validaEmail(email)) {
      return;
    }
    if (!validaSenha(senha)) {
      return;
    }
    try {
      const response = await axios.post(BASEURL + ENDPOINTLOGIN, {
        email,
        senha,
      });

      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    isLoggedin,
    setIsLoggedin,
    loginAadmin,
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
