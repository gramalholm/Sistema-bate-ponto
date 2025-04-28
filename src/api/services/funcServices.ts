import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { ponto } from "../../models/Ponto";
import { Funcionario} from "../../models/Funcionario";
import { NotFoundException } from "../Exceptions/NotFoundException";
import { Exception } from "../Exceptions/Exception";
import { FuncionarioUpdatePswd } from "../../models/Interfaces/FuncionarioUpdatePswd";
import { FuncionarioCreate } from "../../models/Interfaces/FuncionariosCreate";


export const changePassword = async(email:string, senha: string):Promise<Funcionario> =>{
    const prisma = new PrismaClient();
    const funcionario = await getFuncbyid(email);

    if(!email || !senha){
        throw new Exception('senha não informada', 404);
    }

    const updateFuncionario = await prisma.funcionario.update({
       where:{
              email: email
       },
        data:{
            senha: senha
        }
    })
    return updateFuncionario;
}

export const getFuncbyid = async(email: string):Promise<Funcionario> =>{
    console.log("teste");
    const prisma = new PrismaClient();
    try {
        if (!email) {
            throw new Exception('email não informado', 404);
        }
        const funcionario = await prisma.funcionario.findUnique({
            where: {
                email: email,
            }
        });
        if (!funcionario) {
            throw new NotFoundException('funcionario');
        }
        return funcionario;
    } catch (error) {
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

export const deleteFunc = async (email: string): Promise<Funcionario> => {
    const prisma = new PrismaClient();
    try {
        if (!email) {
            throw new Exception('Email não informado', 400); 
        }

        const funcionario = await prisma.funcionario.findUnique({
            where: {
                email: email
            }
        });

        if (!funcionario) {
            throw new Exception('Funcionário não consta no banco de dados', 404);
        }
        await prisma.ponto.deleteMany({
            where: {
                OR: [
                    { funcionarioEmail: email },
                    { funcionarioNome: funcionario.name }
                ]
            }
        });

        const deleteFuncionario = await prisma.funcionario.delete({
            where: {
                email: email
            }
        });

        return deleteFuncionario;

    } catch (error) {
        console.error("Erro ao deletar funcionário:", error);
        throw error;
    } finally {
        await prisma.$disconnect();
        console.log("PrismaClient desconectado");
    }
}

export const editFunc = async (email: string, campo: string, novoValor: string): Promise<any> => {
    const prisma = new PrismaClient();
    try {
        const funcionario = await prisma.funcionario.findUnique({
            where: { email: email }
        });
    
        if (!funcionario) {
            throw new Error('Funcionário não consta no banco de dados');
        }
    
        const camposValidos = ['nome', 'senha', 'email', 'Hora_chegada', 'Hora_saida', 'horas_totais'];
        
        if (!camposValidos.includes(campo)) {
            throw new Error('Campo inválido.');
        }
    
        const dadosAtualizados = {
            [campo]: novoValor
        };
    
        const funcionarioAtualizado = await prisma.funcionario.update({
            where: { email: email },
            data: dadosAtualizados
        });
    
        return funcionarioAtualizado;

    } catch (error) {
        console.error("Erro ao editar funcionário:", error);
        throw error;
    } finally {
        await prisma.$disconnect();
        console.log("PrismaClient desconectado");
    }
}

export const createFunc = async(body: FuncionarioCreate):Promise<Funcionario> => {
    const prisma = new PrismaClient();
    console.log(body);
    try {
        const funcionario = await prisma.funcionario.create({
            data: {
                name: body.name,
                senha: body.senha,
                email: body.email,
                cargo: body.cargo,
                Hora_chegada: body.Hora_chegada, 
                Hora_saida: body.Hora_saida, 
                Horas_totais: body.Horas_totais 
            }
        });

        if (!funcionario) {
            throw new Error("Erro ao criar o funcionário");
        }

        return funcionario;
    } catch (error) {
        console.error("Error creating funcionario:", error);
        throw error;
    } finally {
        await prisma.$disconnect();
        console.log("PrismaClient disconnected");
    }
}

export async function checkIfEmailExists(email: string) {
    const prisma = new PrismaClient();
    try {
        // Verifica se existe um funcionário com o email fornecido
        const funcionario = await prisma.funcionario.findUnique({
            where: {
                email: email,
            },
        });

        // Se o resultado for null, significa que o email não foi encontrado
        if (funcionario) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Erro ao verificar email:', error);
        return false;
    } finally {
        await prisma.$disconnect();
    }
}

export const createCSV = async(pontos: ponto[]) => {
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;

    const csvWriter = createCsvWriter({
        path: 'relatiorio.csv',
        header:[
            {id: 'data', title: 'Data'},
            {id: 'name', title:'Funcionario'},
            {id: 'email', title: 'Email'},
            {id: 'tipo', title: 'Tipo'},
            {id: 'horario', title: 'Horário'},
        ]
    });
    const records = [pontos.map(ponto => {
        return {
            data: ponto.horario,
            name: ponto.funcionarioN.name,
            email: ponto.funcionarioE.email,
            horario: ponto.horario,
            tipo: ponto.tipo,
        }
    })
    ];

    csvWriter.writeRecords(records)
        .then(() => {
            console.log('...Done');
        });
}
