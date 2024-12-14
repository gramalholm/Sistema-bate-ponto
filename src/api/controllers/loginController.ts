import { findLogin } from "../services/loginServices";
import { Request,Response } from "express";

export class loginController {
    
    public static async verifyLogin (req:Request, res: Response): Promise<Response | void>{
        try{
            const { user, password } = req.body
            if(!user || !password){
                return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' });
            }

            const login =  await findLogin(user, password);

            if(!login){
                return res.status(401).json({ error: 'Usuário não encontrado.' });
            }

            if(login.cargo === "RH"){
                return res.sendFile('admin.html', {root: 'src'})
            }else{
                return res.sendFile('func.html', {root: 'src'})
            }

        }catch(error){
            return res.status(500).json({ error: 'Erro interno do servidor.' })
        }

    }   

    
}