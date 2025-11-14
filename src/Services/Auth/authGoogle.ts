import { OAuth2Client } from "google-auth-library";
import { ServerError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";
import { createJWT } from "../Request/Utils/generateJWT";

const defaultError = new ServerError(
  "Não foi possível conseguir as informações do usuário."
);

export const authGoogle = async (parsed: { idToken: string }) => {
  try {
    const client_id = process.env.GOOGLE_CLIENTE_ID;
    const hash = process.env.LOGIN_JWT_SECRET;
    if (!client_id || !hash) throw new ServerError("Internal Server Error!");

    const google_client = new OAuth2Client(client_id);
    const { idToken } = parsed;
    const google = await google_client.verifyIdToken({
      idToken,
      audience: client_id,
    });
    const payload = google.getPayload();

    if (!payload) throw defaultError;
    const { sub, email, name: nome } = payload;
    if (!sub || !email || !nome) throw defaultError;

    const user = await prisma.usuarios.findUnique({
      where: { google_id: sub },
    });

    if (!user) {
      const userByEmail = await prisma.usuarios.findUnique({
        where: { email },
      });
      if (!!userByEmail) {
        await prisma.usuarios.update({
          where: { email },
          data: {
            google_id: sub,
          },
        });
        return createJWT(userByEmail.id, userByEmail.role, hash);
      }
      const newUser = await prisma.usuarios.create({
        data: { email, nome, google_id: sub, valido: true },
      });
      return createJWT(newUser.id, newUser.role, hash);
    }
    return createJWT(user?.id, user?.role, hash);
  } catch (error) {
    throw error;
  }
};
