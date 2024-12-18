import { response, Router } from "express";
import express, {Request, Response} from 'express';
import { funcController } from "../controllers/funcController";
import { pontoController } from "../controllers/pontoController";

const funcRouter = Router();

funcRouter.get('/func', (req: Request, res: Response) => {
    res.sendFile('func.html', {root: 'src'});
})

funcRouter.post('/func/:id', funcController.changePassword);

funcRouter.post('/checkin', pontoController.criarPonto);

export { funcRouter }; 