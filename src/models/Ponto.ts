import { Funcionario } from "./Funcionario";

export interface ponto{
    codigo: string;
    tipo: string;
    horario: Date;
    funcionario: Funcionario;
    funcionarioId: string;
}