import { createContext } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
// import axios from "axios";
export const appContext = createContext();

import axios from "axios";

export function ContextProvider({ children }) {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [formularioValidado, setFormularioValidado] = useState(false);

  const BASEURL = "http://localhost:3000";
  const ENDPOINTLOGIN = "/api/user/admin/login";
  const ENDPOINTPOSTPRODUTO = "/api/products/admin";
  const ENDPOINTPOSTUSUARIO = "/api/user/admin/signup";

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
  // const postProduto = (produto) => {
  //   const token = localStorage.getItem("token");
  //   //adicionar produto ao banco de dados
  //   axios
  //     .post(BASEURL + ENDPOINTPOSTPRODUTO, produto, {
  //       headers: {
  //         Authorization: `${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       const { message, produto } = response.data;

  //       const { id, name, lab_name, unit_price } = produto;
  //       //alert para mensagem de sucesso caso produto seja adicionado ao banco de dados
  //       alert(
  //         `${message}  ID : ${id} Nome: ${name} Laboratorio: ${lab_name} Preço Unitario: ${unit_price}`
  //       );
  //     })
  //     .catch((err) => {
  //       //alert para mensagem de erro caso produto nao seja adicionado ao banco de dados
  //       const { cause, error, status } = err.response.data;
  //       alert(
  //         `Infelizmente o produto  ${produto.name} não foi adiccionado - ${error} - ${cause} - ${status}`
  //       );
  //     });
  // };
  // const handleSubmitProduto = (event) => {
  //   //obter formulário
  //   const form = event.currentTarget;
  //   //variável para guardar os dados do formulário para criação de um novo objeto produto;
  //   let produto;
  //   //se formulario nao e valido
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  //   //mostra os errores dos inputs no formulário
  //   setFormularioValidado(true);
  //   event.preventDefault();
  //   //quando formulário e valido cria um objeto estabelecimento para   ser guardado na base de dados
  //   if (form.checkValidity() === true) {
  //     event.preventDefault();
  //     //captura de dados do formulário para criação de objeto produto
  //     produto = {
  //       name: event.target.elements["medicamento"].value,
  //       lab_name: event.target.elements["laboratorio"].value,
  //       image_link: event.target.elements["imagem"].value,
  //       dosage:
  //         event.target.elements["dosagem"].value +
  //         event.target.elements["unidade_dosagem"].value,
  //       unit_price: Number(event.target.elements["valorUnitario"].value),
  //       type_product: event.target.elements["tipo"].value,
  //       total_stock: Number(event.target.elements["quantidade"].value),
  //       description: event.target.elements["descricao"].value,
  //     };
  //     postProduto(produto);
  //     //limpar formulário  e estado de validação dos campos controlados do formulário
  //     setFormularioValidado(false);
  //     event.target.reset();
  //   }
  // };


  const postUsuario = (usuario) => {
    //adicionar usuario ao banco de dados
    axios
      .post(BASEURL + ENDPOINTPOSTUSUARIO, usuario ,{
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        const { message, usuario } = response.data;

        const { id, name, email, cpf, phone } = usuario;
        //alert para mensagem de sucesso caso usuario seja adicionado ao banco de dados
        alert(
          `${message}  ID : ${id} Nome: ${name} Email: ${email} CPF: ${cpf} Telefone: ${phone}`
        );
      })
      .catch((err) => {
        //alert para mensagem de erro caso usuario nao seja adicionado ao banco de dados
        const { cause, error, status } = err.response.data;
        alert(
          `Infelizmente o usuário  ${usuario.name} não foi adiccionado - ${error} - ${cause} - ${status}`
        );
      });
  }

  const handleCadastrarUsuario = (event) => {
    // Evitar o comportamento padrão do formulário
    event.preventDefault();
    event.stopPropagation();
  
    // Obter os dados do formulário
    const form = event.currentTarget;
    const isValid = form.checkValidity();
  
    // Atualizar o estado de validação
    setFormularioValidado(true);
  
    // Se o formulário for válido, criar o objeto de usuário e enviar para a API
    if (isValid) {
      const usuario = {
        user: {
          full_name: form.elements["name"].value,
          cpf: form.elements["cpf"].value,
          birth_date: form.elements["birth_date"].value,
          email: form.elements["email"].value,
          phone: form.elements["phone"].value,
          password: form.elements["password"].value,
          type_user: form.elements["type_user"].value,
        },
        address: [
          {
            zip: form.elements["cep"].value,
            street: form.elements["street"].value,
            number_street: form.elements["number_street"].value,
            neighborhood: form.elements["neighborhood"].value,
            city: form.elements["city"].value,
            state: form.elements["state"].value,
            complement: form.elements["complement"].value,
            lat: form.elements["lat"].value,
            long: form.elements["long"].value,
          },
        ],
      };
   
      postUsuario(usuario);
      setFormularioValidado(false);
      form.reset();
    }
  };
  

  const value = {
    isLoggedin,
    setIsLoggedin,
    loginAadmin,
    // handleSubmitProduto,
    formularioValidado,
    setFormularioValidado,
    handleCadastrarUsuario,

  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;