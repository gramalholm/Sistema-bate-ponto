import { Request, Response } from "express";
import { deleteFunc, createFunc } from "../services/funcServices";
import { FuncionarioCreate } from "../../models/Interfaces/FuncionariosCreate";
import * as yup from 'yup';

export class adminController{

    public static async createFunc(req: Request<undefined, undefined, FuncionarioCreate>, res: Response):Promise<Response>{
        try{
            const schema = yup.object().shape({
                name: yup.string().required(),
                email: yup.string().required(),
                senha: yup.string().required().min(6),
                cargo: yup.string().required(),
                turno: yup.string().required(),
                Hora_chegada: yup.string(),
                Hora_saida: yup.string(),
                Horas_totais: yup.number().required(),
            });
            
            schema.validate(req.body, {abortEarly: false});

            const funcionario = await createFunc(req.body);
        
            if(!funcionario){
                return res.status(400).json({error: 'Erro ao criar o funcionário'});
            }
            return res.status(200).json({
            message: 'Funcionário criado com sucesso',
            funcionario,
        });
        }catch(error){
            return res.status(500).json({ error: 'Erro ao criar o funcionário' });
        }
    }
/*
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

    public static async createCSV(req: Request, res: Response):Promise<void>{
        const createCsvWriter = require('csv-writer').createObjectCsvWriter;

        const csvWriter = createCsvWriter({
            path: 'relatiorio.csv',
            header:[
                {id: 'data', title: 'Data'},
                {id: 'name', title:'Funcionario'},
                {id: 'id', title: 'Código do Funcionário'},
                {id: 'horario_entrada', title: 'Horário de Entrada'},
                {id: 'horario_saida', title: 'Horário de Saída'},
                {id: 'numeros_atrasos', title: 'Número de Atrasos'},
                {id: 'numeros_faltas', title: 'Falta'},
            ]
        });

        const funcionarios =  this.getAllFuncs(req, res);

        const records = [funcionarios];

        csvWriter.writeRecords(records)
            .then(() => {
                console.log('...Done');
            });
    }
*/
    public static async removeFunc(req: Request, res: Response):Promise<Response>{
        try{
            const { id } = req.body.id;

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
