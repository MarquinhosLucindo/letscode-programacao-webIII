import FildError from "../../dtos/fieldError";
import UserDto from "../../dtos/userDto";
import FieldException from "../../exceptions/fieldExceptions";
import User from "../../models/User";
import UsersRepository from "../../repositories/useRepository";
import { emailPattern } from "../../utils/regex";

export default class UpdateUserUseCase{
    private _repository: UsersRepository;

    constructor(repository: UsersRepository){
        this._repository = repository;
    }

    public execute({id, name, email, password}: UserDto): User{
        const errors: FildError [] = [];
        if(!name){
            errors.push({
                 field: "Name",
                 message: 'Name is required.',
             });
         }
 
         if(!email){
             errors.push({
                 field: "E-mail",
                 message: 'E-mail is required.',
             });
         }
 
         if(!emailPattern.test(email)){
             errors.push({
                 field: 'email',
                 message: 'E-mail is invalid.',
             });
         }
 
         const userByEmail = this._repository.get(
             (x) => x.email.toUpperCase() === email.toUpperCase() &&
             x.id.toUpperCase() !== id.toUpperCase()
         );
 
         if(userByEmail){
             errors.push({
                 field: "E-mail",
                 message: 'E-mail is already in use.',
             });
         }
 
         if(!password){
             errors.push({
                 field: "Password",
                 message: 'Password is required.',
             });
         }
 
         if(errors.length > 0){
             throw new FieldException(errors);
         }
 
       
         const user = new User({ 
            name, 
            email, 
            password,
            });
            user.id = id;
 
        this._repository.update(user);
        return user;
    }
}