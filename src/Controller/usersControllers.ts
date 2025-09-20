import { index } from "../Models/Users";
import { change } from "../Models/Users/change";
import { destroy } from "../Models/Users/destroy";
import { show } from "../Models/Users/show";
import { store } from "../Models/Users/store";
import { update } from "../Models/Users/update";

export const usersController = {
  store,
  index,
  show,
  destroy,
  update,
  change,
};
