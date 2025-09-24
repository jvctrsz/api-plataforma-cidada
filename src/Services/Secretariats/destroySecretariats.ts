import { CError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const destroySecretariats = async (id: number) => {
  try {
    const secretariat = await prisma.secretaria.findUnique({ where: { id } });
    if (!secretariat)
      throw new CError({ error: "Secretaria não encontrada." }, 404);
    const solicitations = await prisma.solicitacao.findFirst({
      where: { secretaria_id: { equals: id } },
    });
    if (!!solicitations)
      throw new CError(
        {
          error:
            "Esta secretaria esta vinculada a solicitações, não é possível deletar.",
        },
        409
      );

    await prisma.secretaria.delete({ where: { id } });
    return "Secretaria deletada com sucesso.";
  } catch (error) {
    throw error;
  }
};
