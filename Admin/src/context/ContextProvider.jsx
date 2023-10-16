import { createContext } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
export const appContext = createContext();

import axios from "axios";

export function ContextProvider({ children }) {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [formularioValidado, setFormularioValidado] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [endereco, setEndereco] = useState({
    logradouro: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const BASEURL = "http://localhost:3000";
  const ENDPOINTLOGIN = "/api/user/admin/login";
  const ENDPOINTPOSTUSUARIO = "/api/user/admin/signup";
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

// ___________VALIDAÇÃO DE CADASTRO DE USUARIO_______________________

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
    const regex = /^[0-9]{10,}$/; // Para pelo menos 10 dígitos

    if (!regex.test(telefone)) {
        alert(
            "Telefone incorreto, verificar se não possui caracteres especiais ou menos de 10 dígitos."
        );
        return false;
    }
    return true;
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
    let idade = dataAtual.getFullYear() - dataNascimentoFormatada.getFullYear();
    const mes = dataAtual.getMonth() - dataNascimentoFormatada.getMonth();
    if (
      mes < 0 ||
      (mes === 0 && dataAtual.getDate() < dataNascimentoFormatada.getDate())
    ) {
      idade--;
    }
    if (idade < 18 || idade > 120) {
      alert("Idade incorreta, verificar se a idade é maior que 18 anos.");
      return false;
    }
    return true;
  }
  // Função para remover caracteres não numéricos de uma string
  function removeNonNumericCharacters(value) {
    return value.replace(/\D/g, "");
  }

//função para buscar endereço pelo cep
  const handleBuscarEndereco = async (e) => {
    const { value } = e.target;
    const cep = value?.replace(/\D/g, "");

    if (cep?.length !== 8) {
      return;
    }
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.erro) {
          alert("CEP não encontrado");
          return;
        }
        setEndereco({
          setCep: data.cep,
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
        });
      });
  };
  const handleLimparCamposCadastroUsuario = () => {
    setCep("");
    setLogradouro("");
    setBairro("");
    setCidade("");
    setEstado("");
    setEndereco({
      logradouro: "",
      bairro: "",
      cidade: "",
      estado: "",
    });
  };
  const postUsuario = (usuarioProp) => {
    usuarioProp.user.type_user = tipoUsuario;
    const token = localStorage.getItem("token");

    axios
      .post(BASEURL + ENDPOINTPOSTUSUARIO, usuarioProp, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        const { message, usuario } = response.data;
        if (usuario && usuario.full_name) {
          const { full_name } = usuario;
          console.log(usuario);
          alert(`${message} - Usuário ${full_name} cadastrado com sucesso!`);
        } else {
          alert(`${message} - Usuário cadastrado com sucesso!`);
        }
      })
      .catch((error) => {
        if (error.response) {
          // O servidor respondeu com um código de erro
          if (error.response.status === 409) {
            alert("Usuário já cadastrado. Por favor, escolha um email diferente.");
          } else {
            console.error(error.response.data); // Lidar com outros erros de resposta do servidor
            alert(`Erro ao cadastrar usuário: ${error.response.data.message}`);
          }
        } else if (error.request) {
          // A solicitação foi feita, mas não recebeu resposta
          console.error(error.request);
          alert("Não foi possível cadastrar o usuário. Tente novamente mais tarde.");
        } else {
          // Algo aconteceu durante a configuração da solicitação que desencadeou um erro
          console.error("Erro", error.message);
          alert("Ocorreu um erro inesperado. Tente novamente mais tarde.");
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
      const cpfValue = removeNonNumericCharacters(form.elements["cpf"].value);
      const cpfValido = validaCPF(cpfValue);
      const telefoneValue = removeNonNumericCharacters(
        form.elements["phone"].value
      );
      const telefoneValido = validaTelefone(telefoneValue);
      const cepValue = removeNonNumericCharacters(form.elements["zip"].value);
      const cepValido = validaCEP(cepValue); 
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
        !idadeValida
      ) {
        return;
      }

      usuario = {
        user: {
          full_name: form.elements["full_name"].value,
          cpf: removeNonNumericCharacters(form.elements["cpf"].value),
          birth_date: form.elements["birth_date"].value,
          email: form.elements["email"].value,
          phone: removeNonNumericCharacters(form.elements["phone"].value),
          password: form.elements["password"].value,
          type_user: tipoUsuario,
        },
        address: [
          {
            zip: removeNonNumericCharacters(form.elements["zip"].value),
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
//___________-FIM VALIDAÇÃO DE CADASTRO DE USUARIO-_______________________

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
    formularioValidado,
    setFormularioValidado,
    handleCadastrarUsuario,
    tipoUsuario,
    setTipoUsuario,
    handleBuscarEndereco,
    handleLimparCamposCadastroUsuario,
    endereco,
    setEndereco,
    cep,
    setCep,
    logradouro,
    setLogradouro,
    bairro,
    setBairro,
    cidade,
    setCidade,
    estado,
    setEstado,
    handleSubmitProduto,
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
