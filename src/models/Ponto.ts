import { Funcionario } from "./Funcionario";

export interface ponto{
    codigo: string;
    tipo: string;
    horario: Date;
    funcionarioE: Funcionario;
    funcionarioEmail: string;
    funcionarioN: Funcionario;
    funcionarioNome: string;
}