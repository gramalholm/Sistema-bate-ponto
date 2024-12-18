import { getFuncbyid } from "../services/funcServices";
import { Request,Response } from "express";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";


export class loginController {
    
    public static async verifyLogin(req: Request, res: Response): Promise<Response | void> {
        try {
            const { email, senha } = req.body;
    
            if (!email || !senha) {
                return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' });
            }
    
            const login = await getFuncbyid(email);

            if (!login) {
                return res.status(404).json({ error: 'Usuário não encontrado.' });
            }

            const isPasswordCorrect = await compare(senha, login.senha);

            console.log(isPasswordCorrect);
            console.log(login);

            if(isPasswordCorrect){

                const token = jwt.sign({ id: login.email }, process.env.JWT_SECRET as string, {expiresIn: '1d'});
                
                if (login.cargo === "RH") {
                    const token = jwt.sign({ id: login.email }, process.env.JWT_SECRET as string, {expiresIn: '1d'});
                    return res.json({ redirect: "/src/html/admin.html", token });
                } else {
                    const token = jwt.sign({ id: login.email }, process.env.JWT_SECRET as string, {expiresIn: '12h'});
                    return res.json({ redirect: "/src/html/func.html", token });
                }
            }
            else{
                return res.status(500).json({ error: 'senha errada.' });
            }
            
        } catch (error) {
        
            return res.status(500).json({ error: 'Erro ao verificar o login' });
        }
    } 

}