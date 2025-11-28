import { SecretariatsQueries } from "../../Controller/types";
import { prisma } from "../../Utils/prisma";

export const indexSecretariats = async (
  queries: Partial<SecretariatsQueries>
) => {
  try {
    const {
      nome,
      secretario_id,
      secretario_nome,
      atualizado_em,
      bairro,
      celular,
      cep,
      cidade,
      criado_em,
      descricao,
      email,
      logradouro,
      numero,
      telefone,
      uf,
      whatsapp,
    } = queries;
    const secretariats = await prisma.secretaria.findMany({
      orderBy: { id: "asc" },
      where: {
        ...(nome && { nome: { contains: nome } }),
        ...(!!Number(secretario_id) && {
          secretario_id: { equals: Number(secretario_id) },
        }),
        ...(secretario_nome && {
          secretario_nome: { contains: secretario_nome },
        }),
        ...(celular && {
          celular: { contains: celular },
        }),
        ...(bairro && {
          bairro: { contains: bairro },
        }),
        ...(telefone && {
          telefone: { contains: telefone },
        }),
        ...(email && {
          email: { contains: email },
        }),
        ...(logradouro && {
          logradouro: { contains: logradouro },
        }),
        ...(numero && {
          numero: { contains: numero },
        }),
        ...(cep && {
          cep: { contains: cep },
        }),
        ...(cidade && {
          cidade: { contains: cidade },
        }),
        ...(uf && {
          uf: { contains: uf },
        }),
        ...(descricao && {
          descricao: { contains: descricao },
        }),
        ...(whatsapp && {
          whatsapp: { contains: whatsapp },
        }),
        ...(criado_em && {
          criado_em: { equals: criado_em },
        }),
        ...(atualizado_em && {
          atualizado_em: { equals: atualizado_em },
        }),
      },
    });
    return secretariats;
  } catch (error) {
    throw error;
  }
};
