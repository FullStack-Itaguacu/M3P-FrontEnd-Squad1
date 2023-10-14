import { createContext } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
export const appContext = createContext();
import axios from "axios";

export function ContextProvider({ children }) {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [cpf, setCpf] = useState("");
  const [birth_date, setD] = useState("");
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [type_user, setTypeUser] = useState("");

  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [number_street, setNumberStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [complement, setComplement] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const BASEURL = "http://localhost:3000";
  const ENDPOINTLOGIN = "/api/user/admin/login";
  const ENDPOINTCADASTRO = "/api/user/admin/signup";

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

  const loginAadmin = async (email, password) => {
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
          const token = response.data.data;
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

  // função para cadastrar usuario no banco de dados
  async function handleCadastrarUsuario(event) {
    if (!validaEmail(email)) {
      return;
    }
    if (!validaSenha(password)) {
      return;
    }
    event.preventDefault();

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        BASEURL + ENDPOINTCADASTRO,
        {
          user: {
            full_name,
            cpf,
            birth_date,
            email,
            phone,
            password,
            type_user,
          },
          address: [
            {
              zip: cep,
              street,
              number_street,
              neighborhood,
              city,
              state,
              complement,
              lat,
              long,
            },
          ],
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(response.data);
      alert(`Usuário cadastrado com sucesso!`);
    } catch (error) {
      console.error(error.response.data);
      alert(`Erro ao cadastrar usuário: ${error.response.data.message} `);
    }
  }

  function handleViaCep(cepCode) {
    axios.get(`https://viacep.com.br/ws/${cepCode}/json/`).then((response) => {
      const { logradouro, bairro, localidade, uf } = response.data;
      setStreet(logradouro);
      setNeighborhood(bairro);
      setCity(localidade);
      setState(uf);
    });
  }

  const value = {
    isLoggedin,
    setIsLoggedin,
    loginAadmin,
    validaEmail,
    validaSenha,
    handleCadastrarUsuario,
    cpf,
    setCpf,
    birth_date,
    setD,

    full_name,
    setFullName,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    type_user,
    setTypeUser,
    cep,
    setCep,
    street,
    setStreet,
    number_street,
    setNumberStreet,
    neighborhood,
    setNeighborhood,
    city,
    setCity,
    state,
    setState,
    complement,
    setComplement,
    lat,
    setLat,
    long,
    setLong,
    handleViaCep,
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
