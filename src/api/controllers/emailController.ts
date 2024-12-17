import { Request, Response } from "express";
import { transporter } from "../config/nodemailerConfig";
import { getFuncbyid, changePassword } from "../services/funcServices";

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
