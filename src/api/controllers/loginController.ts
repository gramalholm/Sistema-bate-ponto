
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
            console.log("este é o login:", login);
    
            if (!login) {
                return res.status(404).json({ error: 'Usuário não encontrado.' });
            }
    
            console.log("este é o login:", login);
    
            if (login.cargo === "RH") {
                return res.json({ redirect: "/src/html/admin.html" }); // Retorna o caminho para o front
            } else {
                return res.json({ redirect: "/src/html/func.html" }); // Retorna o caminho para o front
            }
        } catch (error) {
            console.error("Erro no servidor:", error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    } 

}