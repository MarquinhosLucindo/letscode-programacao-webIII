import express from 'express';
import { v4 } from 'uuid';

const server = express();
server.use(express.json());

/*
GET: buscando dados;
POST: criando dados;
PUT: alterar dado;
DELETE: axcluir dados;
*/

/*
Route params: quando queremos acessar algo específico, editar;
Query params: multiplos parametros(ex: filtros);
Request body: Não é GET, envia informações variadas;
*/

/*
id,
name,
email,
password
*/

let users = [];

//Listagem
server.get('/users', (request, response)=>{
    response.send(users)
});

//Pesquisa
server.get('/users/:id', (request, response)=>{
    const { id } = request.params;
    const user = users.find(x => x.id === id);
    response.send(user)
});

//Cadastro de Usuário
server.post('/users', (request, response)=>{
    const {name, email, password} = request.body;

    const id = v4();

    const user = {
        id,
        name,
        email,
        password
    };

    users.push(user);

    response.send(user);
});

//Edição
server.put('/users/:id', (request, response)=>{
    //pesquisar usuario
    //alterar as informaçãoes
    //salvar o usuario
    const { id } = request.params;
    const {name, email, password} = request.body;

    const userIndex = users.findIndex(x => x.id === id);
    const user = {
        id,
        name,
        email,
        password
    };

    users[userIndex] = user;

    response.send(user);
});

//remoção ou deletar
server.delete('/users/:id', (request, response)=>{
    const { id } = request.params;
    users = users.filter(x => x.id !== id);
    response.send({}); 
});

//remoção ou deletar

server.listen(3333, ()=>{
    console.log('Server is Running!');
});