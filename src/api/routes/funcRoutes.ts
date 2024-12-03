//Script de configuração das rotas da API ( GET, PUT, POST, DELETE, PATCH, ... )
import { response, Router } from "express";
import express, {Request, Response} from 'express';

//Router serve para especificarmos todas nossas rotas e passar tais rotas para o servidor.
const funcRouter = Router();

//rota GET para a pagina inicial
funcRouter.get('/', (req: Request, res: Response) => { 
    res.sendFile('index.html', {root: 'src'});
});

funcRouter.post('/',(req: Request, res: Response) => { 
    // verificar se o banco de dados contém o id, se sim procuramos o funcionário com esse id botamos o horário de entrada/saida e a data.
    //dentro do if se o funcinario existir avisar que o horário foi cronometrado.
    //se o id for da administração fazer o redirect para a pagina de admin.
    //res.redirect(/admin);
});


export{ funcRouter };