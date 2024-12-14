const nodemailer = require("nodemailer");

function gerarSenhaTemporaria() {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let senha = "";
    for (let i = 0; i < 8; i++) {
      senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return senha;  
}
const transport = nodemailer.createTransport({
    service:"gmail",
    secure: true,
    auth: {
      user: "suportesistmadeponto@gmail.com", 
      pass: "iqjf zlgz ypyi owsp", 
    },
});

document.getElementById('senhaForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Evita o envio do formulário (página não recarrega)
    
    // Pega o valor do campo de email
    const email = document.getElementById('emailInput').value;
    if (!email) {
        alert('Por favor, insira um email válido.');
        return;
    }
    console.log("teste")
    const senhaTemporaria = gerarSenhaTemporaria();
    transport.sendMail({
        from: 'Suporte <suportesistmadeponto@gmail.com>',
        to: email,
        subject: 'Sua senha temporária',
        text: `Aqui está sua senha temporária: ${senhaTemporaria}`
    })
});

  