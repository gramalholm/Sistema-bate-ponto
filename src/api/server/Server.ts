//Script de configuração do servidor usando express.
import express, {Request, Response} from 'express';
import cors from 'cors';
import { loginRouter } from '../routes/Routes';
import { funcRouter } from '../routes/funcRoutes';
import { adminRouter } from '../routes/adminRoutes';
import { emailRouter } from "../routes/emailRoutes";
import { corsMiddleware } from '../middlewares/cors';

// instanciando o servidor
const app = express();

app.use(corsMiddleware);
app.use(cors()); 
app.use(express.static('public'));
app.use(express.json());

app.use('/', loginRouter);
app.use('/admin', adminRouter);
app.use('/func', funcRouter);
app.use("/email", emailRouter);

export { app };