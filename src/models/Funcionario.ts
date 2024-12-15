export interface funcionario{
    name: string;
    id: string;
    email: string;
    senha: string;
    Hora_chegada: string | null;
    Hora_saida: string | null;
    Horas_totais: string | null;
    cargo: string;
    turno: string;
}