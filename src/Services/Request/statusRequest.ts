import { StatusType } from "../../Controller/types";
import { ConflictError, NotFoundError } from "../../Utils/Errors/CError";
import { createTransporter } from "../../Utils/Functions/transporter";
import { prisma } from "../../Utils/prisma";
import { statusHTML } from "../Users/Utils/statusHTML";

export const statusRequest = async (
  id: number,
  parsed: { status: StatusType }
) => {
  try {
    const request = await prisma.solicitacao.findUnique({ where: { id } });
    if (!request) throw new NotFoundError("Solicitação não encontrada.");

    const { status } = parsed;
    if (request.status === status)
      throw new ConflictError(`A Solicitação já está com o status: ${status}.`);

    const user = await prisma.usuarios.findUnique({
      where: { id: request.usuarios_id },
    });
    if (!user) throw new NotFoundError("Usuário não encontrado.");

    const transporter = createTransporter();
    const html = statusHTML({
      id_request: id,
      name: user.nome,
      new_status: status,
      old_status: request.status,
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Atualização de status",
      html,
    });

    await prisma.solicitacao.update({
      where: { id },
      data: {
        status,
        atualizado_em: new Date(),
      },
    });
    return "Status alterado com sucesso.";
  } catch (error) {
    throw error;
  }
};
