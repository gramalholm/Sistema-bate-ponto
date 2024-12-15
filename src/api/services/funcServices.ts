import { Prisma, PrismaClient } from "@prisma/client";
import { Funcionario} from "../../models/Funcionario";
import { NotFoundException } from "../Exceptions/NotFoundException";
import { Exception } from "../Exceptions/Exception";
import { FuncionarioUpdatePswd } from "../../models/FuncionarioUpdatePswd";
import { FuncionarioCreate } from "../../models/FuncionariosCreate";
import { schemaFuncionarioCreate } from "../../validação";


//update senha funcionario
export const changePassword = async(id:string, body: FuncionarioUpdatePswd):Promise<Funcionario> =>{
    const prisma = new PrismaClient();
    const funcionario = await getFuncbyid(id);

    if(!body.senha){
        throw new Exception('senha não informada', 404);
    }

    const updateFuncionario = await prisma.funcionario.update({
        where:{
            id: id
        },
        data:{
            senha: body.senha
        }
    })
    return funcionario;
}

//getall funcionarios
/*
export const getAllFuncionarios = async(dataInicio: Date, dataFinal: Date):Promise<Funcionario[]> =>{
    const prisma = new PrismaClient();

    const funcionarios = await prisma.funcionario.findMany({
        where:{
            createdAt:{
                gte: dataInicio,
                lte: dataFinal
            }
        }   
    });
    if(funcionarios?.length === 0){
         throw new NotFoundException('funcionarios');
    }
    return funcionarios;
}
*/
//getFuncbyid
export const getFuncbyid = async(id: string):Promise<Funcionario> =>{

    const prisma = new PrismaClient();
    try {
        if (!id) {
            throw new Exception('id não informado', 404);
        }

        // Aguarde a execução da consulta
        const funcionario = await prisma.funcionario.findUnique({
            where: {
                id,
            }
        });

        if (!funcionario) {
            throw new NotFoundException('funcionario');
        }

        return funcionario;  // Retorna o funcionário encontrado
    } catch (error) {
        throw error;
    } finally {
        // Certifique-se de desconectar o Prisma Client após a operação
        await prisma.$disconnect();
    }
}

//delete funcionario
export const deleteFunc = async(id: string):Promise<Funcionario> =>{
    const prisma = new PrismaClient();
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
export const createFunc = async(body: FuncionarioCreate):Promise<Funcionario> => {
    console.log("blablabla");
    const prisma = new PrismaClient();
    console.log("PrismaClient instance created");
    console.log(body);
    try {
        const funcionario = await prisma.funcionario.create({
            data: {
                name: body.name, // Ajuste para corresponder ao campo 'nome' do body
                senha: body.senha,
                email: body.email,
                cargo: body.cargo,
                turno: body.turno,
                Hora_chegada: body.Hora_chegada, // Certifique-se de que este campo está presente no body
                Hora_saida: body.Hora_saida, // Certifique-se de que este campo está presente no body
                Horas_totais: body.Horas_totais // Certifique-se de que este campo está presente e é uma string
            }
        });

        if (!funcionario) {
            throw new Error("Erro ao criar o funcionário");
        }

        console.log("Funcionario created:", funcionario);
        return funcionario;
    } catch (error) {
        console.error("Error creating funcionario:", error);
        throw error;
    } finally {
        await prisma.$disconnect();
        console.log("PrismaClient disconnected");
    }
}


//update funcionario checkIn
/*
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
*/