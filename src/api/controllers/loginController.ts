import { getFuncbyid } from "../services/funcServices";
import { Request,Response } from "express";

export class loginController {
    
    public static async verifyLogin(req: Request, res: Response): Promise<Response | void> {
        try {
            const { user, password } = req.body;
            
            // Verifica se o usuário e a senha foram informados
            if (!user || !password) {
                return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' });
            }
            console.log('Chamada para getFuncbyid com:', { user, password });
            // Chama a função de autenticação passando o usuário e a senha
            const login = await getFuncbyid(user, password);
            console.log('Resultado de getFuncbyid:', login);
            if (!login) {
                return res.status(404).json({ error: 'Usuário não encontrado ou senha incorreta.' });
            }

            // Verifica o cargo para direcionar para a página apropriada
            if (login.cargo === "RH") {
                return res.sendFile('admin.html', { root: 'src' });
            } else {
                return res.sendFile('func.html', { root: 'src' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }

}