export interface FuncionarioCreate {
    name: string;
    email: string;
    senha: string;
    cargo: string;
    turno: string;
    Hora_chegada?: string;
    Hora_saida?: string;
    Horas_totais: string;
}