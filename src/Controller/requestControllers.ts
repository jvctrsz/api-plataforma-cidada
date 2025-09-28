import { index } from "../Models/Requests";
import { destroy } from "../Models/Requests/destroy";
import { show } from "../Models/Requests/show";
import { store } from "../Models/Requests/store";

export const requestController = {
  store,
  index,
  show,
  destroy,
};
