import { Prisma, PrismaClient } from "@prisma/client";
import { Funcionario} from "../../models/Funcionario";
import { Exception, NotFoundException } from "../Exceptions";
import express from 'express'

const app = express()
const prisma = new PrismaClient();

app.use(express.json())
export const CreateFunc = async():Promise<void> =>{
    app.post('/funcionario', async (req, res) =>{
        await prisma.funcionario.create({
            data: {
                name: req.body.name,
                cargo: req.body.cargo,
                turno: req.body.turno,
                email: req.body.email,
                Hora_chegada: req.body.Hora_chegada,
                Hora_saida: req.body.Hora_saida,
                Horas_totais: req.body.Horas_totais
            }
        })
        return res.send('Usuario criado')
    })  
}

export const checkFuncionarioExistsByName = async (name: string): Promise<boolean> => {
    try {
      // Consulta no banco de dados para verificar se o funcionário existe
      const funcionario = await prisma.funcionario.findUnique({
        where: {
          name: name, // Filtro pelo nome do funcionário
        },
      });
  
      // Retorna true se o funcionário existir, caso contrário false
      return funcionario !== null;
    } catch (error) {
      console.error('Erro ao verificar funcionário:', error);
      throw new Error('Não foi possível verificar o funcionário.');
    }
  };

export const checkInOut = async(data: string):Promise<> => {
    
}

export const changePassword = async(name: string, id: string, newId: string):Promise<Funcionario> =>{

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