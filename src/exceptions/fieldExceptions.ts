import FildError from "../dtos/fieldError";

export default class FieldException{
    public errors: FildError[];
    public statusCode: number = 400;



    constructor(errors: FildError[]){
        this.errors = errors;
    }
}