import { index } from "../Models/Users";
import { destroy } from "../Models/Users/destroy";
import { show } from "../Models/Users/show";
import { store } from "../Models/Users/store";

export const usersController = {
  store,
  index,
  show,
  destroy,
};
