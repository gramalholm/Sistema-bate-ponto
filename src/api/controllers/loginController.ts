
import { getFuncbyid } from "../services/funcServices";
import { Request,Response } from "express";

export class loginController {
    
    public static async verifyLogin (req:Request, res: Response): Promise<Response | void>{
        try{
            const { user, password } = req.body
            if(!user || !password){
                return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' });
            }

            const login =  await getFuncbyid(password);

            if(!login){
                return res.status(404).json({ error: 'Usuário não encontrado.' });
            }

            if(login.cargo === "RH"){
                return res.redirect('/admin');
            }else{
                return res.redirect('/func');
            }
        }catch(error){
            return res.status(500).json({ error: 'Erro interno do servidor.' })
        }
    }   

}