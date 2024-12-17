
import { getFuncbyid } from "../services/funcServices";
import { Request,Response } from "express";

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
                    return res.json({ redirect: "/src/html/admin.html" });
                } else {
                    return res.json({ redirect: "/src/html/func.html" });
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