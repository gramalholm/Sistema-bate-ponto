import { Request, Response } from "express";
import { transporter } from "../config/nodemailerConfig";
import { getFuncbyid, createCSV, changePassword } from "../services/funcServices";
import { getAllPontos } from "../services/pontoServices";
import schedule from "node-schedule";
import { Funcionario } from "@prisma/client";


function gerarSenhaTemporaria(): string {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let senha = "";
    for (let i = 0; i < 8; i++) {
        senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return senha;
}

export const sendEmail = async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: "Email é obrigatório." });
    }

    const senhaTemporaria = gerarSenhaTemporaria();

    try {
        const funcionarioEmail = await getFuncbyid(req.body.email);
        if(funcionarioEmail){
            await transporter.sendMail({
                from: "Suporte <suportesistmadeponto@gmail.com>",
                to: email,
                subject: "Sua senha temporária",
                text: `Aqui está sua senha temporária: ${senhaTemporaria}`,
            });
            changePassword(funcionarioEmail.email, senhaTemporaria)
            return res.status(200).json({ message: "Email enviado com sucesso!", senha: senhaTemporaria });
        }
        return res.status(500).json({ error: "email não cadastrado." });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "email não cadastrado." });
    }
};

export const sendReport = async (dataInicio: Date, dataFinal: Date) => {
    try{
        const pontos = await getAllPontos(dataInicio, dataFinal);
        createCSV(pontos);
        await transporter.sendMail({
            from: "Suporte <suportesistmadeponto@gmail.com>",
            to: "Visione-Rh@gmail.com",
            subject: "Relatório de ponto",
            text: "Segue em anexo o relatório de ponto dos funcionários",
            attachments: [
                {
                    filename: 'relatorio.csv',
                    path: './relatorio.csv'
                }
            ]
        });
        console.log("Email enviado com sucesso!");
    }catch(error){
        console.error(error);
    }
}

export function configurarAgendamentoRelatorio() {
    schedule.scheduleJob("59 23 28-31 * *", async() => {
        const dataAtual = new Date();
        const ultimoDia = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0);
        const primeiroDia = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1);

        if(dataAtual.getDate() === ultimoDia.getDate()){
            await sendReport(primeiroDia, ultimoDia);
        }
    })
}
