import { genericExceptionMessage } from './../utils/constants';
import { Router } from "express";
import User from "../models/User";
import { emailPattern } from "../utils/regex";
import UsersRepository from "../repositories/useRepository";
import ListUsersUseCase from "../useCases/users/listUsers";
import GetUserUseCase from "../useCases/users/getUser";
import ResponseError from "../dtos/fieldError";
import CreateUserUseCase from "../useCases/users/createUser";
import UserDto from "../dtos/userDto";
import FieldException from "../exceptions/fieldExceptions";
import UpdateUserUseCase from '../useCases/users/updateUser';
import DeleteUserUseCase from '../useCases/users/deleteUser';


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

//Todas as rotas de Users.
const usersRoutes = Router();


const repository = new UsersRepository();


//Listagem
usersRoutes.get('/', (request, response)=>{
    const useCase = new ListUsersUseCase(repository);
    const users = useCase.execute();
    return response.send(users);
});

//Pesquisa
usersRoutes.get('/:id', (request, response)=>{
    const { id } = request.params;
    const useCase = new GetUserUseCase(repository);
    const user = useCase.execute(id);

    if(!user){
        return response.status(404).send('User not found!');
    } 
    return response.send(user)
});

//Cadastro
usersRoutes.post('/', (request, response)=>{         
    const useCase = new CreateUserUseCase(repository);
    const user = useCase.execute(request.body as UserDto);
    return response.status(201).send(user);  
});

//Edição
usersRoutes.put('/:id', (request, response)=>{
    //pesquisar usuario
    //alterar as informaçãoes
    //salvar o usuario    
        const { id } = request.params;
        const {name, email, password} = request.body as User;
        const useCase = new UpdateUserUseCase(repository);
        const user = useCase.execute({
            id,
            name, 
            email, 
            password
        });
        return response.send(user);    
    
});

//remoção ou deletar
usersRoutes.delete('/:id', (request, response)=>{
    const { id } = request.params;
    const useCase = new DeleteUserUseCase(repository);
    useCase.execute(id);
    return response.send({}); 
});

export default usersRoutes;