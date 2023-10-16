import { createContext } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
export const appContext = createContext();

import axios from "axios";

export function ContextProvider({ children }) {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [formularioValidado, setFormularioValidado] = useState(false);

  const BASEURL = "http://localhost:3000";
  const ENDPOINTLOGIN = "/api/user/admin/login";
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

  //validação de cadastro de usuario
  function validaCPF(cpf) {
    const regex = /^[0-9]{11}$/;

    if (!regex.test(cpf)) {
      alert(
        "CPF incorreto, verificar se não possui caracteres especiais ou menos de 11 dígitos."
      );
    }
    return regex.test(cpf);
  }

  function validaTelefone(telefone) {
    const regex = /^[0-9]+$/;

    if (!regex.test(telefone)) {
      alert(
        "Telefone incorreto, verificar se não possui caracteres especiais."
      );
    }
    return regex.test(telefone);
  }
  function validaCEP(cep) {
    const regex = /^[0-9]{8}$/;

    if (!regex.test(cep)) {
      alert("CEP incorreto, verificar se possui 8 dígitos numéricos.");
    }
    return regex.test(cep);
  }

  function validaCampoObrigatorio(campo, nomeCampo) {
    if (!campo || campo.trim() === "") {
      alert(`O campo ${nomeCampo} é obrigatório.`);
      return false;
    }
    return true;
  }
  //idade minima para cadastro 18 anos
  function validaIdade(dataNascimento) {
    const dataAtual = new Date();
    const dataNascimentoFormatada = new Date(dataNascimento);
    const idade = dataAtual.getFullYear() - dataNascimentoFormatada.getFullYear();
    const mes = dataAtual.getMonth() - dataNascimentoFormatada.getMonth();
    if (mes < 0 || (mes === 0 && dataAtual.getDate() < dataNascimentoFormatada.getDate())) {
      idade--;
    }
    if (idade < 18) {
      alert("Idade mínima para cadastro é 18 anos.");
      return false;
    }
    return true;
  }

  const postUsuario = (usuario) => {
    usuario.user.type_user = typeUser;
    console.log(usuario);
    const token = localStorage.getItem("token");
    axios
      .post(BASEURL + ENDPOINTPOSTUSUARIO, usuario, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        const { message, usuario } = response.data;
        const { full_name } = usuario;
        alert(`${message} Nome: ${full_name} `);
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          alert("Usuário já existe");
        } else {
          console.error(err);
        }
      });
  };
  
  const handleCadastrarUsuario = (event) => {
    const form = event.currentTarget;
    let usuario;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setFormularioValidado(true);
    event.preventDefault();

    if (form.checkValidity() === true) {
      event.preventDefault();
      const emailValido = validaEmail(form.elements["email"].value);
      const senhaValida = validaSenha(form.elements["password"].value);
      const cpfValido = validaCPF(form.elements["cpf"].value);
      const telefoneValido = validaTelefone(form.elements["phone"].value);
      const cepValido = validaCEP(form.elements["zip"].value);
      const nomeCompletoValido = validaCampoObrigatorio(
        form.elements["full_name"].value,
        "Nome completo"
      );
      const idadeValida = validaIdade(form.elements["birth_date"].value);
     
      // Se qualquer uma das validações falhar, pare o processamento e não envie os dados para o back-end
      if (
        !emailValido ||
        !senhaValida ||
        !cpfValido ||
        !telefoneValido ||
        !cepValido ||
        !nomeCompletoValido ||
        !typeUserValido ||
        !idadeValida 
      ) {
        return;
      }
      usuario = {
        user: {
          full_name: form.elements["full_name"].value,
          cpf: form.elements["cpf"].value,
          birth_date: form.elements["birth_date"].value,
          email: form.elements["email"].value,
          phone: form.elements["phone"].value,
          password: form.elements["password"].value,
          type_user: form.elements["type_user"].value,
        },
        address: [
          {
            zip: form.elements["zip"].value,
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
