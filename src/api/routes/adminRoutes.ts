import { response, Router } from "express";
import express, {Request, Response} from 'express';
import { adminController } from "../controllers/adminController";

const adminRouter = Router();

adminRouter.get('/page', async (req: Request, res: Response) => {
    res.sendFile('admin.html', {root: 'src'});
});

adminRouter.post('/', adminController.createFunc);

adminRouter.delete('/:id', adminController.removeFunc);

adminRouter.put('/:email', adminController.putFunc);

adminRouter.post('/relatorio', adminController.gerarRelatório);

adminRouter.post('/check/:email', adminController.getFunc);

export { adminRouter };
