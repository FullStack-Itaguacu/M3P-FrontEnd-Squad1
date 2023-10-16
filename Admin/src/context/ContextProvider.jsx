import { useState, createContext } from "react";
import PropTypes from "prop-types";
// import axios from "axios";
export const appContext = createContext();

import axios from "axios";

export function ContextProvider({ children }) {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [formularioValidado, setFormularioValidado] = useState(false);

  const BASEURL = "http://localhost:3000";
  const ENDPOINTLOGIN = "/api/user/admin/login";
  const ENDPOINPRODUTOS = "/api/products/admin/";

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
  const postProduto = (produto) => {
    const token = localStorage.getItem("token");
    //adicionar produto ao banco de dados
    axios
      .post(BASEURL + ENDPOINPRODUTOS, produto, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        const { message, produto } = response.data;

        const { id, name, lab_name, unit_price } = produto;
        //alert para mensagem de sucesso caso produto seja adicionado ao banco de dados
        alert(
          `${message}  ID : ${id} Nome: ${name} Laboratorio: ${lab_name} Preço Unitario: ${unit_price}`
        );
      })
      .catch((err) => {
        //alert para mensagem de erro caso produto nao seja adicionado ao banco de dados
        const { cause, error, status } = err.response.data;
        alert(
          `Infelizmente o produto  ${produto.name} não foi adiccionado - ${error} - ${cause} - ${status}`
        );
      });
  };
  const handleSubmitProduto = (event) => {
    //obter formulário
    const form = event.currentTarget;
    //variável para guardar os dados do formulário para criação de um novo objeto produto;
    let produto;
    //se formulario nao e valido
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    //mostra os errores dos inputs no formulário
    setFormularioValidado(true);
    event.preventDefault();
    //quando formulário e valido cria um objeto estabelecimento para   ser guardado na base de dados
    if (form.checkValidity() === true) {
      event.preventDefault();
      //captura de dados do formulário para criação de objeto produto
      produto = {
        name: event.target.elements["medicamento"].value,
        lab_name: event.target.elements["laboratorio"].value,
        image_link: event.target.elements["imagem"].value,
        dosage:
          event.target.elements["dosagem"].value +
          event.target.elements["unidade_dosagem"].value,
        unit_price: Number(event.target.elements["valorUnitario"].value),
        type_product: event.target.elements["tipo"].value,
        total_stock: Number(event.target.elements["quantidade"].value),
        description: event.target.elements["descricao"].value,
      };
      postProduto(produto);
      //limpar formulário  e estado de validação dos campos controlados do formulário
      setFormularioValidado(false);
      event.target.reset();
    }
  };

  function buscarProdutos(setProdutos, setTotalPages, setPage, setName, setType_product, setLimit, name, type_product, page, limit) {
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
      .then((res) => {BASEURL
        if (res && res.status === 200) {
          setProdutos(res.data.products);
          setTotalPages(res.data.total_pages);
          setPage(res.data.actual_page);
        }
        if (res && res.status === 204) {
          alert(
            "Nenhum produto encontrado com esses parametros de busqueda, vamos mostrar todos os produtos"
          );
          setName("");
          setType_product("");
          setLimit(30);
        }
      });
  }
  const value = {
    isLoggedin,
    setIsLoggedin,
    loginAadmin,
    handleSubmitProduto,
    formularioValidado,
    setFormularioValidado,
    buscarProdutos,
    BASEURL,
    ENDPOINTLOGIN,
    ENDPOINPRODUTOS,
    
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
