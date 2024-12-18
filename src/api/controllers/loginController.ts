
import { getFuncbyid } from "../services/funcServices";
import { Request,Response } from "express";
import  jwt  from "jsonwebtoken";
import { compare } from "bcrypt";
const JWT_SECRET = 'codigo';

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
            

            if(login.senha === senha){
                if (login.cargo === "RH") {
                    const token = jwt.sign({ id: login.email }, JWT_SECRET, {expiresIn: '6h'});
                    return res.json({ redirect: "/src/html/admin.html", token, email, nome: login.name });
                } else {
                    const token = jwt.sign({ id: login.email }, JWT_SECRET, {expiresIn: '2h'});
                    return res.json({ redirect: "/src/html/func.html", token, email, nome: login.name });
                }
            }
            else{
                return res.status(500).json({ error: 'senha errada.' });
            }
            
        } catch (error) {
            console.error("Erro no servidor:", error);
            return res.status(500).json({ error: 'Usuário não encontrado.' });
        }
    } 

}