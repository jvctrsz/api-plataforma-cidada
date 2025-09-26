"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redefineAndLoginHTML = void 0;
const htmlInfo = {
    redefinir: {
        title: "Redefinição de Senha",
        message: "Recebemos uma solicitação para redefinir a sua senha. Clique no botão abaixo para criar uma nova senha para a sua conta.",
        alert: "Se você não solicitou a redefinição, por favor, ignore este e-mail.",
        button: "Redefinir Senha",
    },
    ativar: {
        title: "Ativação de Conta",
        message: "Recebemos uma solicitação para ativar a sua senha. Clique no botão abaixo para realizar a ativação da sua conta.",
        button: "Ativar Conta",
    },
};
const redefineAndLoginHTML = (nome, token, type) => {
    const infos = htmlInfo[type];
    return `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${infos.title}</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background-color: #007bff;
                color: #ffffff;
                padding: 20px;
                text-align: center;
            }
            .content {
                padding: 30px;
                text-align: center;
                color: #333333;
            }
            .content h1 {
                font-size: 24px;
                margin-bottom: 20px;
            }
            .content p {
                font-size: 16px;
                line-height: 1.5;
                margin-bottom: 25px;
            }
            .button {
                display: inline-block;
                padding: 12px 25px;
                background-color: #007bff;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
            }
            .footer {
                background-color: #f4f4f4;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #777777;
            }
            .footer p {
                margin: 0;
            }
            .link-text {
                word-break: break-all;
                font-size: 14px;
                color: #007bff;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>${infos.title}</h2>
            </div>
            <div class="content">
                <h1>Olá, ${nome}!</h1>
                <p>${infos.message}</p>
                <p>${infos.alert ?? ""}</p>
                <a href="${token}" class="button">${infos.button}</a>
                <p style="margin-top: 30px;">Se o botão não funcionar, copie e cole o link abaixo em seu navegador:</p>
                <p class="link-text">${token}</p>
            </div>
            <div class="footer">
                <p>Este e-mail foi enviado automaticamente. Por favor, não responda.</p>
            </div>
        </div>
    </body>
    </html>
`;
};
exports.redefineAndLoginHTML = redefineAndLoginHTML;
