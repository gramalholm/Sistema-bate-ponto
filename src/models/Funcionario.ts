export interface Funcionario{
    name: string;
    id: string;
    email: string;
    senha: string;
    Hora_entrada?: string | null;
    Hora_saida?: string | null;
    Horas_totais: string;
    cargo: string;
    turno: string;
}