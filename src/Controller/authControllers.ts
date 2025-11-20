import { active } from "../Models/Auth/active";
import { google } from "../Models/Auth/google";
import { login } from "../Models/Auth/login";
import { recovery } from "../Models/Auth/recovey";
import { redefine } from "../Models/Auth/redefine";
import { register } from "../Models/Auth/register";

export const authController = {
  login,
  register,
  active,
  google,
  recovery,
  redefine,
};
