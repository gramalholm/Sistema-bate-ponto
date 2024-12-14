import { Request, Response } from "express"
import { changePassword } from "../services/funcServices"

export class funcController{

    public static async changePassword(req: Request, res: Response):Promise<Response>{
        try{
            const {user, password, newPassword} = req.body;
            if(!user || !password || !newPassword){
                return res.status(404).json({error: 'Usuário e senha são obrigatórios.'});
            }
        
            const funcionario = changePassword(user, password, newPassword);

            if(!funcionario){
                return res.status(400).json({error: 'Funcionário não encontrado'});
            }

            return res.status(200).json("Senha do funcionário alterada com sucesso");

        }catch(error){
            return res.status(500).json({ error: 'Erro interno do servidor.' })
        }
    }

    public static async checkInOut(req: Request, res: Response):Promise<Response>{
        
    
    
    }
}