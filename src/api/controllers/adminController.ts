
import { Request, Response } from "express";
import { deleteFunc, createFunc, checkIfEmailExists, editFunc } from "../services/funcServices";
import { createCSV } from "../services/funcServices";
import { FuncionarioCreate } from "../../models/Interfaces/FuncionariosCreate";
import { ponto } from "../../models/Ponto";
import * as yup from 'yup';
import { create } from "axios";
import { getAllPontos } from "../services/pontoServices";

const bodyValidation: yup.Schema<FuncionarioCreate> = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    senha: yup.string().required().min(6),
    cargo: yup.string().required(),
    Hora_chegada: yup.string(),
    Hora_saida: yup.string(),
    Horas_totais: yup.string().required(),
});

export class adminController{

    public static async createFunc(req: Request<undefined, undefined, FuncionarioCreate>, res: Response):Promise<Response>{
        try{
            let validatedFuncionario: FuncionarioCreate | undefined;
            try{
                validatedFuncionario = await bodyValidation.validate(req.body, {abortEarly: false});
            }catch(error){
                const yupError = error as yup.ValidationError;
                const validationErrors: Record<string, string> = {};

                yupError.inner.forEach((error) => {
                    error.message
                    if(!error.path) return;
                    validationErrors[error.path] = error.message;
                });

                return res.status(404).json({
                    errors:validationErrors,
                });
            }
            const funcionario = await createFunc(validatedFuncionario);
        
            if(!funcionario){
                return res.status(404).json({error: 'Erro ao criar o funcionário'});
            }

            return res.status(200).json({
            message: 'Funcionário criado com sucesso',
            funcionario,
            });

        }catch(error){
            return res.status(400).json({ error: 'Erro ao criar o funcionário' });
        }
    }

    public static async gerarRelatório(req: Request, res: Response):Promise<Response>{
        try{
            const dataInicial = req.body.dataInicial;
            const dataFinal = req.body.dataFinal;

            const pontos: ponto[] = await getAllPontos(dataFinal, dataInicial);
            if(!pontos){
                return res.status(404).json({error: 'Dados dos pontos não encontrados'});
            }
            await createCSV(pontos);
            return res.status(200).json(pontos);
        }catch(error){
            return res.status(500).json({ error: 'Erro ao buscar os funcionários' });
        }
    }

    public static async removeFunc(req: Request, res: Response):Promise<Response>{
        try{
            const { email } = req.body;

            if(!email){
                return res.status(404).json({error: 'email é obrigatório'});
            }
            
            const hasDeleted = await deleteFunc(email);

            if(!hasDeleted){
                return res.status(404).json({error: 'funcionario não encontrado'});
            }
            return res.status(200).json({message: 'Funcionário criado com sucesso'});
            return res.status(200).json({message: 'Funcionário criado com sucesso'});

        }catch(error){
            return res.status(500).json({ error: 'Erro ao remover o funcionário' });
        }
    }

    public static async getFunc(req: Request, res: Response) {
        console.log("teste");
        try{
            const { email } = req.body;
            console.log(email);
            if(!email){
                return res.status(404).json({error: 'email é obrigatório'});
            }
            
            const existe = await checkIfEmailExists(email);

            if(!existe){
                return res.status(404).json({error: 'funcionario não encontrado'});
            }
            return res.status(200).json({message: 'Funcionário existe.'});

        }catch(error){
            return res.status(500).json({ error: 'Erro ao procurar o funcionário' });
        }
    }

    public static async putFunc(req: Request, res: Response) {
        console.log("teste");
        try{
            const { email, campo, novoValor } = req.body;
            console.log(email);
            if (!email || !campo || !novoValor) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            }
            
            const funcionarioEdit = await editFunc(email, campo, novoValor);

            if(!funcionarioEdit){
                return res.status(404).json({error: 'funcionario não encontrado'});
            }
            return res.status(200).json({message: 'Funcionário editado com sucesso.'});

        }catch(error){
            return res.status(500).json({ error: 'Erro ao editar o funcionário' });
        }
    }
}


