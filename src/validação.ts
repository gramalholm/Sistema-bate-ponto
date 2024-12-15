import * as yup from 'yup';
import { FuncionarioCreate } from './models/FuncionariosCreate';

export const schemaFuncionarioCreate: yup.Schema<FuncionarioCreate> = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    senha: yup.string().required().min(6),
    cargo: yup.string().required(),
    turno: yup.string().required(),
    Hora_chegada: yup.string(),
    Hora_saida: yup.string(),
    Horas_totais: yup.string().required(),
});

