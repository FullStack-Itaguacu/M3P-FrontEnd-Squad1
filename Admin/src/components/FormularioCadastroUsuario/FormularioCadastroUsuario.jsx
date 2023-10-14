import React, { useState ,useEffect} from "react";
import { Form, Button } from "react-bootstrap";
import { useContexto } from "../../context/useContexto";
import axios from "axios";

const FormularioCadastroUsuario = () => {

    const {
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
        handleCadastrarUsuario,
        handleViaCep
      } = useContexto();

    //   async function handleViaCep(cep) {
        
    //     const url = `https://viacep.com.br/ws/${cep}/json/`;
    //     await axios.get(url).then((response) => {
    //       const { logradouro, bairro, localidade, uf } = response.data;
    //       setStreet(logradouro);
    //       setNeighborhood(bairro);
    //       setCity(localidade);
    //       setState(uf);
    //     });
    //   }



  return (
    <Form onSubmit={handleCadastrarUsuario}>
      <Form.Group controlId="formCpf">
        <Form.Label>CPF</Form.Label>
        <Form.Control
          type="text"
          placeholder="000.000.000-00"
          value={cpf}
          onChange={(event) => setCpf(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formDataNascimento">
        <Form.Label>Data de Nascimento</Form.Label>
        <Form.Control
          type="date"
          placeholder="DD/MM/AAAA"
          value={birth_date}
          onChange={(event) => setD(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formNomeCompleto">
        <Form.Label>Nome Completo</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nome Completo"
          value={full_name}
          onChange={(event) => setFullName(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formTelefone">
        <Form.Label>Telefone/Celular</Form.Label>
        <Form.Control
          type="text"
          placeholder="(048) 99999-9999"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formTipoUsuario">
        <Form.Label>Tipo Usuário</Form.Label>
        <Form.Control
          as="select"
          value={type_user}
          onChange={(event) => setTypeUser(event.target.value)}
          required
        >
          <option value="">Selecione o tipo de usuário</option>
          <option value="Admin">Administrador</option>
          <option value="Buyer">Comprador</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formSenha">
        <Form.Label>Senha</Form.Label>
        <Form.Control
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}"
          required
        />
      </Form.Group>

      <Form.Group controlId="formCep">
        <Form.Label>CEP</Form.Label>
        <Form.Control
          type="text"
          placeholder="88888-888"
          value={cep}
        //   onBlur= {(event) => handleViaCep(event.target.value)}
            onChange={(event) => setCep(event.target.value)}

          required
        />
      </Form.Group>

      <Form.Group controlId="formEstado">
        <Form.Label>Estado</Form.Label>
        <Form.Control
          type="text"
          placeholder="Estado"
          value={state}
          onChange={(event) => setState(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formCidade">
        <Form.Label>Cidade</Form.Label>
        <Form.Control
          type="text"
          placeholder="Cidade"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBairro">
        <Form.Label>Bairro</Form.Label>
        <Form.Control
          type="text"
          placeholder="Bairro"
          value={neighborhood}
          onChange={(event) => setNeighborhood(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formLogradouro">
        <Form.Label>Logradouro</Form.Label>
        <Form.Control
          type="text"
          placeholder="Logradouro"
          value={street}
          onChange={(event) => setStreet(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formNumero">
        <Form.Label>Número</Form.Label>
        <Form.Control
          type="number"
          placeholder="Número"
          value={number_street}
          onChange={(event) => setNumberStreet(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formComplemento">
        <Form.Label>Complemento</Form.Label>
        <Form.Control
          type="text"
          placeholder="Complemento"
          value={complement}
          onChange={(event) => setComplement(event.target.value)}
        />
      </Form.Group>

        <Form.Group controlId="formLatitude">
        <Form.Label>Latitude</Form.Label>
        <Form.Control
          type="text"
          placeholder="Latitude"
          value={lat}
          onChange={(event) => setLat(event.target.value)}
          
        />
        </Form.Group>

        <Form.Group controlId="formLongitude">
        <Form.Label>Longitude</Form.Label>
        <Form.Control
          type="text"
          placeholder="Longitude"
          value={long}
          onChange={(event) => setLong(event.target.value)}
          
        />
        </Form.Group>


      <Button variant="primary" type="submit">
        Cadastrar
      </Button>
    </Form>
  );
};

export default FormularioCadastroUsuario;

