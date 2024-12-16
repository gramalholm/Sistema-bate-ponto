import * as yup from 'yup';
import { FuncionarioCreate } from '../../models/Interfaces/FuncionariosCreate';
import { RequestHandler } from 'express';

export const bodyValidation: yup.Schema<FuncionarioCreate> = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    senha: yup.string().required().min(6),
    cargo: yup.string().required(),
    turno: yup.string().required(),
    Hora_chegada: yup.string(),
    Hora_saida: yup.string(),
    Horas_totais: yup.string().required(),
});

export const createBodyValidator: RequestHandler = async (req, res, next) =>{ 
    try{
        await bodyValidation.validate(req.body, {abortEarly: false});
        return next();
    }catch(error){
        const yupError = error as yup.ValidationError;
        const validationErrors: Record<string, string> = {};
        yupError.inner.forEach((error) => {
            error.message
            if(!error.path) return;
            validationErrors[error.path] = error.message;
        });

        return res.status(404).json({
            errors:validationErrors,
        });
    }
    
}