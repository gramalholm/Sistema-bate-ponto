import { Prisma, PrismaClient } from "@prisma/client";
import { Funcionario } from "../../models/Funcionario";

export const findLogin = async (user: string, password: string):Promise<Funcionario> =>{
    
    const prisma = new PrismaClient();
    
    const login = await prisma.funcionario.findUnique({
        where: {
            email: user,
            senha: password,
        }
    });
    if(!login){
        throw Error;
    }
    return login;
}
