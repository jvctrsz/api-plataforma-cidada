import { ConflictError, NotFoundError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export type SecretariatsStatus = "ativar" | "desativar";
export const changeStatusSecretariats = async (
  id: number,
  status: SecretariatsStatus
) => {
  try {
    const secretariat = await prisma.secretaria.findUnique({ where: { id } });
    if (!secretariat) throw new NotFoundError("Secretaria não encontrada.");

    let ativo: boolean;
    if (status === "ativar") {
      if (secretariat.ativo)
        throw new ConflictError("Secretaria já está ativa.");
      ativo = true;
    } else {
      if (!secretariat.ativo)
        throw new ConflictError("Secretaria já está desativada.");
      ativo = false;
    }
    const message = status === "ativar" ? "ativada" : "desativada";
    await prisma.secretaria.update({ where: { id }, data: { ativo } });
    return `Secretaria ${message} com sucesso.`;
  } catch (error) {
    throw error;
  }
};
