import { response, Router } from "express";
import express, {Request, Response} from 'express';
import { funcController } from "../controllers/funcController";

const funcRouter = Router();

funcRouter.get('/', (req: Request, res: Response) => {
    res.sendFile('func.html', {root: 'src'});
})

funcRouter.post('/:id', funcController.changePassword);

export { funcRouter }; 