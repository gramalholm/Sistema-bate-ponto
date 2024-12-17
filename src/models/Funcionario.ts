export interface Funcionario{
    name: string;
    email: string;
    senha: string;
    Hora_entrada?: string | null;
    Hora_saida?: string | null;
    Horas_totais: string;
    cargo: string;
}