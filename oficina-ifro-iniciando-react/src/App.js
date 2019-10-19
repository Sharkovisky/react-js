import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Container, Row, Col, Navbar, NavbarBrand, FormGroup, Input, Button, Table} from 'reactstrap';

const App = props => {
  const [nome, setNome] = React.useState("");
  const [idade, setIdade] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [alunos, setAlunos] = React.useState([]);
  
  const submit = async event => {
    event.preventDefault();

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const response = await fetch("http://localhost:3001/alunos", {
      method:"POST",
      body: JSON.stringify({nome, idade, email}),
      headers
    })

    if(response.ok){
      alert('Enviado com sucesso')
      return;
    }

    alert('Erro ao enviar: '+response.status)
  }

  const buscarAlunos = async () => {
    const response = await fetch('http://localhost:3001/alunos');

    if(!response.ok){
      alert('Erro ao buscar: '+response.status)
    }

    const alunos = await response.json();

    setAlunos(alunos);
  }

  return (
    <React.Fragment>
        <Navbar color="primary">
          <NavbarBrand>
            Oficina IFRO ADS
          </NavbarBrand>
        </Navbar>

        <Container>
          <Row>
            <form onSubmit={submit}>
              <Col>
                <FormGroup>
                  <label>Nome: </label>
                  <Input name="nome" value={nome} onChange={event => setNome(event.target.value)}/>
                  <label>Idade: </label>
                  <Input name="idade" type="number" value={idade} onChange={event => setIdade(event.target.value)}/>
                  <label>E-mail: </label>
                  <Input name="email" value={email} onChange={event => setEmail(event.target.value)}/>
                </FormGroup>
                <Col>
                  <Button type="submit">Enviar</Button>
                </Col>
              </Col>
            </form>
          </Row>
          <Row>
            <Col>
              <Button onClick={event => buscarAlunos()}>Buscar alunos</Button>
            </Col>
            <Col>
            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Idade</th>
                  <th>E-mail</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map(aluno => <tr>
                  <td>{aluno.nome}</td>
                  <td>{aluno.idade}</td>
                  <td>{aluno.email}</td>
                </tr>)}
              </tbody>
            </Table>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
  )
}

export default App;
