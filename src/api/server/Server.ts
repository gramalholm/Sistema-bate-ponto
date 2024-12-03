//Script de configuração do servidor usando express.
import express, {Request, Response} from 'express';
import { funcRouter } from '../routes/Routes';
import { adminRouter } from '../routes/adminRoutes';
import path from 'path';

// instanciando o servidor
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "ts")))

//Falando para o server usar as rotas definidas em funcRouter apenas na pagina inicial (login)
app.use('/', funcRouter);
//Falando para o server usar as rotas definidas em adminRouter apenas na pagina do adm.
app.use('/admin', adminRouter);



export { app };