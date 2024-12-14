import { Prisma, PrismaClient } from "@prisma/client";
import { funcionario } from "../../models/Funcionario";

export const findLogin = async (user: string, password: string):Promise<funcionario> =>{
    
    const prisma = new PrismaClient();
    
    const login = await prisma.funcionario.findUnique({
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


