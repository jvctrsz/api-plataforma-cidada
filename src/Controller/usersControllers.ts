import { index } from "../Models/Users";
import { change } from "../Models/Users/change";
import { destroy } from "../Models/Users/destroy";
import { recovery } from "../Models/Users/recovey";
import { redefine } from "../Models/Users/redefine";
import { role } from "../Models/Users/role";
import { show } from "../Models/Users/show";
import { store } from "../Models/Users/store";
import { update } from "../Models/Users/update";
import { user } from "../Models/Users/user";

export const usersController = {
  store,
  index,
  show,
  destroy,
  update,
  change,
  recovery,
  redefine,
  user,
  role,
};
