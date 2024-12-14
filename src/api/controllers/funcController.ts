import express, {Request, Response} from 'express';
import { PrismaClient } from '@prisma/client'

const app = express();
const prisma = new PrismaClient()

export class funcController{
    public static async changePassword(req: Request, res: Response):Promise<Response>{
        try{

        }catch(error){

        }
    }
}