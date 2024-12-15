const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());  // Permite JSON no corpo da requisição
app.use(cors());  // Permite chamadas de outros domínios

// Função para gerar senha temporária
function gerarSenhaTemporaria() {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let senha = "";
    for (let i = 0; i < 8; i++) {
        senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return senha;  
}

// Configuração do Nodemailer
const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "suportesistmadeponto@gmail.com", // Seu email
        pass: "iqjf zlgz ypyi owsp", // Sua senha de app do Gmail
    },
});

// Rota para envio de e-mail
app.post("/send-email", (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: "Email é obrigatório." });
    }

    const senhaTemporaria = gerarSenhaTemporaria();

    transport.sendMail({
        from: 'Suporte <suportesistmadeponto@gmail.com>',
        to: email,
        subject: 'Sua senha temporária',
        text: `Aqui está sua senha temporária: ${senhaTemporaria}`,
    }, (err, info) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao enviar email." });
        }
        res.status(200).json({ message: "Email enviado com sucesso!", senha: senhaTemporaria });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
