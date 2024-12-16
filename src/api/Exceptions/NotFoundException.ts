import { Exception } from "./Exception";

export class NotFoundException extends Exception{
    constructor(funcionario: string){
        super('${funcionario} não encontrado', 404);
    }
}