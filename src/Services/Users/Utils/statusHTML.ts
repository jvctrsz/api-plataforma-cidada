import { StatusType } from "../../../Controller/types";

const statusColor: Record<StatusType, string> = {
  criado: "red",
  andamento: "blue",
  finalizado: "green",
  pendente: "yellow",
};

interface statusHTML {
  name: string;
  id_request: number;
  old_status: StatusType;
  new_status: StatusType;
}

export const statusHTML = ({
  id_request,
  name,
  new_status,
  old_status,
}: statusHTML) => `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Status da Sua Solicitação Atualizado</title>
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
        .status-badge {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            color: #ffffff;
            border-radius: 5px;
            font-size: 18px;
            font-weight: bold;
        }
        .old-color {
        background-color: ${statusColor[old_status]}; 
        }
        .new-color {
        background-color: ${statusColor[new_status]}; 
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
            <h2>🔔 Atualização de Status da Solicitação</h2>
        </div>
        <div class="content">
            <h1>Olá, <strong>${name}</strong>!</h1>
            <p>Informamos que o status da sua solicitação <strong>${id_request}</strong> foi atualizado.</p>
            
            <p>O status antigo é:</p>
            
            <span class="status-badge old-color">
                ${old_status}
            </span>
           
            <p>O novo status é:</p>
            
            <span class="status-badge new-color">
                ${new_status}
            </span>

           
        </div>
        <div class="footer">
            <p>Este e-mail foi enviado automaticamente. Por favor, não responda.</p>
        </div>
    </div>
</body>
</html>`;
