import { Prisma, PrismaClient } from "@prisma/client";
import { funcionario } from "../../models/Funcionario";

export const findFunc = async():Promise<funcionario[]> =>{
    
    const prisma = new PrismaClient();
    



}