import { Request, Response } from "express";
import { deleteFunc, getAllFuncionarios, createFunc } from "../services/funcServices";

export class adminController{

    public static async createFunc(req: Request, res: Response):Promise<Response>{
        try{
            const { name, id, cargo, turno, horario_chegada, horario_saida, horas_totais } = req.body;
            const funcionario = createFunc(name, id, cargo, turno, horario_chegada, horario_saida, horas_totais);
            if(!funcionario){
                return res.status(400).json({error: 'Erro ao criar o funcionário'});
            }
            return res.status(200).json("Funcionário criado com sucesso");
        }catch(error){
            return res.status(500).json({ error: 'Erro ao criar o funcionário' });
        }
    }

    public static async getAllFuncs(req: Request, res: Response):Promise<Response>{
        try{
            const dataInicial = req.body.dataInicial;
            const dataFinal = req.body.dataFinal;
            const funcionarios = getAllFuncionarios(dataFinal, dataInicial);
            if(!funcionarios){
                return res.status(404).json({error: 'Funcionários não encontrados'});
            }
            return res.status(200).json(funcionarios);

        }catch(error){
            return res.status(500).json({ error: 'Erro ao buscar os funcionários' });
        }
    }

    public static async removeFunc(req: Request, res: Response):Promise<Response>{
        try{
            const { id } = req.body;

            if(!id){
                return res.status(404).json({error: 'id é obrigatório'});
            }
            
            const hasDeleted = deleteFunc(id);

            if(!hasDeleted){
                return res.status(404).json({error: 'funcionario não encontrado'});
            }

            return res.status(200).json("Funcionário removido com sucesso");
        }catch(error){
            return res.status(500).json({ error: 'Erro ao remover o funcionário' });
        }
    }
}
