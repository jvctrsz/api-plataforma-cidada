import argon2 from "argon2";

export const hashPassword = async (password: string) => {
  try {
    const hash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1,
    });
    return hash;
  } catch {
    throw Error;
  }
};
