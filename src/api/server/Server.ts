//Script de configuração do servidor usando express.
import express, {Request, Response} from 'express';
import { loginRouter } from '../routes/Routes';
import { funcRouter } from '../routes/funcRoutes';
import { adminRouter } from '../routes/adminRoutes';

// instanciando o servidor
const app = express();

app.use(express.json());

app.use(express.static('public'));

app.use('/', loginRouter);

app.use('/admin', adminRouter);

app.use('/func', funcRouter)



export { app };