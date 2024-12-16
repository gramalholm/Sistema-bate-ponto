import { response, Router } from "express";
import express, {Request, Response} from 'express';
//import { adminController } from "../controllers/adminController";

/* A fazer:
1) Criar os controladores e os middlewares.
2) Definir todas as rotas do admin e da pagina de login .
3) Criar o query selector para pegar os dados.
4) funções de verificação do banco de dados e implementação do tal.
*/
const adminRouter = Router();

adminRouter.get('/admin', async (req: Request, res: Response) => {
    res.sendFile('teste.html', {root: 'src'});
});

adminRouter.post('/admin',  adminController.createFunc);

adminRouter.delete('/admin', adminController.removeFunc);

export { adminRouter };