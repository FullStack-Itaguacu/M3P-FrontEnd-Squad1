
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


//___________-FIM VALIDAÇÃO DE CADASTRO DE USUARIO-_______________________

export {
  validaCPF,
  validaTelefone,
  validaCEP,
  validaCampoObrigatorio,
  validaIdade,
  removeNonNumericCharacters,
  validaSenha,
  validaEmail,
};
