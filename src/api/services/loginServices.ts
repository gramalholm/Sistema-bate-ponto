import { Prisma, PrismaClient } from "@prisma/client";
import { Funcionario } from "../../models/Funcionario";

export const findLogin = async (user: string, password: string):Promise<Funcionario> =>{
    
    const prisma = new PrismaClient();
    
    const login = await prisma.Funcionario.findUnique({
        where: {
            name: user,
            id: password,
        }
    });
    if(!login){
        throw Error;
    }
    return login;
}


