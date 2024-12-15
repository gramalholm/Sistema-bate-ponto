
import { Prisma, PrismaClient } from "@prisma/client";
import { Funcionario} from "../../models/Funcionario";

import { NotFoundException } from "../Exceptions/NotFoundException";
import { Exception } from "../Exceptions/Exception";


//update senha funcionario
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

//getall funcionarios
export const getAllFuncionarios = async(dataInicio: Date, dataFinal: Date):Promise<Funcionario[]> =>{
    const prisma = new PrismaClient();

    const funcionarios = await prisma.Funcionario.findMany({
        where:{
            createdAt:{
                gte: dataInicio,
                lte: dataFinal
            }
        }   
}   );

    if(funcionarios?.length === 0){
        throw new NotFoundException('funcionarios');
    }

    return funcionarios;
}

//getFuncbyid
export const getFuncbyid = async(user: string, id: string):Promise<Funcionario> =>{
    const prisma = new PrismaClient();

    
    if(!id){
        throw new Exception('id não informado', 404);
    }

    const funcionario = prisma.Funcionario.findUnique({
        where:{
            name: user,
            id,
        }
    })

    if(!funcionario){
        throw new NotFoundException('funcionario');
    }
    return funcionario;
}

//delete funcionario
export const deleteFunc = async(id: string):Promise<Funcionario> =>{
    const prisma = new PrismaClient();

    if(!id){
        throw new Exception('id não informado', 404);
    }

    const funcionario = prisma.Funcionario.findUnique({
        where:{
            id,
        }
    })

    if(!funcionario){
        throw new NotFoundException('funcionario');
    }

    const deleteFuncionario = await prisma.funcionario.delete({
        where:{
            id: id
        }
    })

    if(!deleteFuncionario){
        throw new NotFoundException('funcionario');
    }

    return deleteFuncionario;
}

//create funcionario
export const createFunc = async(name: string, id: string, cargo: string, turno: string, horario_chegada: string, horario_saida: string, horas_totais: string):Promise<Funcionario> =>{
    const prisma = new PrismaClient();

    if(!name  !cargo  !horario_chegada  !horas_totais){
        throw new Exception('Todos os campos são obrigatórios', 404);
    }
    const funcionario = await prisma.Funcionario.create({
        data:{
            name: name,
            id: id,
            cargo: cargo,
            turno: turno,
            horario_chegada: horario_chegada,
            horario_saida: horario_saida,
            horas_totais: horas_totais
        }
    })
    return funcionario;
}

//update funcionario checkIn
const updateCheckIn = async(id:string, checkIn: string):Promise<Funcionario> =>{
    const prisma = PrismaClient();

    if(!id || !checkIn){
        throw new Exception('id e checkIn são obrigatórios', 404);
    }

    const funcionario = await prisma.Funcionario.update({
        where:{
            id: id,
            
        }
    })

}