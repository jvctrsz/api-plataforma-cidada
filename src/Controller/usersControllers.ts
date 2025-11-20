import { index } from "../Models/Users";
import { change } from "../Models/Users/change";
import { destroy } from "../Models/Users/destroy";
import { employees } from "../Models/Users/employees";
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
  user,
  role,
  employees,
};
