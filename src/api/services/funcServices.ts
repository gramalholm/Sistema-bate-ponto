import { Prisma, PrismaClient } from "@prisma/client";
import { funcionario} from "../../models/Funcionario";


import { NotFoundException } from "../Exceptions/NotFoundException";
import { Exception } from "../Exceptions/Exception";

const prisma = new PrismaClient();

//update senha funcionario
export const changePassword = async(name: string, senha: string, newSenha: string):Promise<funcionario> =>{

    if(!name || !senha){
        throw new Exception("Usuário ou senha não informados", 404);
    }

    const funcionario = await prisma.funcionario.update({
        where:{
            name: name,
        },
        data:{
            senha: newSenha,
        }
    })
    
    if(!funcionario){
        throw new NotFoundException('funcionario');
    }

    return funcionario;
}

//getall funcionarios
export const getAllFuncionarios = async(dataInicio: Date, dataFinal: Date):Promise<funcionario[]> =>{

    const funcionarios = await prisma.funcionario.findMany({
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
export const getFuncbyid = async(user: string, id: string):Promise<funcionario> =>{

    
    if(!id){
        throw new Exception('id não informado', 404);
    }

    const funcionario = prisma.funcionario.findUnique({
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
export const deleteFunc = async(id: string):Promise<funcionario> =>{

    if(!id){
        throw new Exception('id não informado', 404);
    }

    const funcionario = prisma.funcionario.findUnique({
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
export const createFunc = async(name: string, id: string, cargo: string, turno: string, horario_chegada: string, horario_saida: string, horas_totais: string, senha:string, email:string):Promise<funcionario> =>{

    if(!name || !cargo || !horario_chegada || !horas_totais){
        throw new Exception('Todos os campos são obrigatórios', 404);
    }
    const funcionario = await prisma.funcionario.create({
        data:{
            name: name,
            id: id,
            email: email,
            senha: senha,
            cargo: cargo,
            turno: turno,
            Hora_chegada: horario_chegada,
            Hora_saida: horario_saida,
            Horas_totais: horas_totais
        }
    })
    return funcionario;
}

/*update funcionario checkIn
const updateCheckIn = async(id:string, checkIn: string):Promise<funcionario> =>{
    

    if(!id || !checkIn){
        throw new Exception('id e checkIn são obrigatórios', 404);
    }

    const funcionario = await prisma.funcionario.update({
        where:{
            id: id,
            
        }
    })

}*/