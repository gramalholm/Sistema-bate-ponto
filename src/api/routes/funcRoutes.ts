import { response, Router } from "express";
import express, {Request, Response} from 'express';
import { funcController } from "../controllers/funcController";
const funcRouter = Router();

funcRouter.get('/func', (req: Request, res: Response) => {
    res.sendFile('func.html', {root: 'src'});
})

funcRouter.post('/func', )

export { funcRouter }; 