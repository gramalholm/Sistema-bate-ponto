export interface FuncionarioCreate {
    name: string;
    email: string;
    senha: string;
    cargo: string;
    Hora_chegada?: string;
    Hora_saida?: string;
    Horas_totais: string;
}