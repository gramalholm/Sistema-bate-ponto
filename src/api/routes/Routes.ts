//Script de configuração das rotas da API ( GET, PUT, POST, DELETE, PATCH, ... )
import { response, Router } from "express";
import express, {Request, Response} from 'express';
import { loginController } from "../controllers/loginController";

//Router serve para especificarmos todas nossas rotas e passar tais rotas para o servidor.
const loginRouter = Router();

//rota GET para a pagina inicial
/*loginRouter.get('/', (req: Request, res: Response) => { 
    res.sendFile('index.html', {root: 'src'});
});*/

loginRouter.post('/', loginController.verifyLogin);

export{ loginRouter };