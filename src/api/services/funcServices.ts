import { Prisma, PrismaClient } from "@prisma/client";
import { Funcionario} from "../../models/Funcionario";
import { NotFoundException } from "../Exceptions/NotFoundException";

export const checkInOut = async(data: string):Promise<> => {
    
}

export const changePassword = async(name: string, id: string, newId: string):Promise<Funcionario> =>{
    const prisma = new PrismaClient();

    if(!name || !id){
        throw new Exception("Usuário ou senha não informados", 404);
    }

    const funcionario = await prisma.funcionario.update({
        where:{
            name: name,
            id: id,
        },
        data:{
            id: newId,
        }
    })
    
    if(!funcionario){
        throw new NotFoundException('funcionario');
    }

    return funcionario;
}