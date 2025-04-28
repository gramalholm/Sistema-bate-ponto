
import { Request, Response } from "express"
import { changePassword } from "../services/funcServices"

export class funcController{

    public static async changePassword(req: Request, res: Response):Promise<Response>{
        try{
            const {user, newPassword} = req.body;
            if(!user || !newPassword){
                return res.status(404).json({error: 'Usuário e senha são obrigatórios.'});
            }
        
            const funcionario = changePassword(user,  newPassword);

            if(!funcionario){
                return res.status(400).json({error: 'Funcionário não encontrado'});
            }

            return res.status(200).json({message: "Senha do funcionário alterada com sucesso"});

        }catch(error){
            return res.status(500).json({ error: 'Erro interno do servidor.' })
        }
    }
}