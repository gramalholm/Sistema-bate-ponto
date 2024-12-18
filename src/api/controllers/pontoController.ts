import { Request, Response } from "express"
import { criarPontoComConexoes } from "../services/pontoServices"

export class pontoController{

    public static async criarPonto(req: Request, res: Response):Promise<Response>{
        try{
            const {tipo, email, nome} = req.body;
            if(!tipo){
                return res.status(404).json({error: 'Marque o tipo de ponto que você deseja executar.'});
            }
        
            const Ponto = criarPontoComConexoes(email, nome, tipo);

            if(!Ponto){
                return res.status(400).json({error: 'Ponto não batido.'});
            }

            return res.status(200).json({message: "Ponto batido com sucesso."});

        }catch(error){
            return res.status(500).json({ error: 'Erro interno do servidor.' })
        }
    }
}