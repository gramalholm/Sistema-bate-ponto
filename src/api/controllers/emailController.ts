import { Request, Response } from "express";
import { transporter } from "../config/nodemailerConfig";

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
        await transporter.sendMail({
            from: "Suporte <suportesistmadeponto@gmail.com>",
            to: email,
            subject: "Sua senha temporária",
            text: `Aqui está sua senha temporária: ${senhaTemporaria}`,
        });

        return res.status(200).json({ message: "Email enviado com sucesso!", senha: senhaTemporaria });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao enviar email." });
    }
};
