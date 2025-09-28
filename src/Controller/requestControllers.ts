import { index } from "../Models/Requests";
import { destroy } from "../Models/Requests/destroy";
import { show } from "../Models/Requests/show";
import { status } from "../Models/Requests/status";
import { store } from "../Models/Requests/store";
import { update } from "../Models/Requests/update";

export const requestController = {
  store,
  index,
  show,
  destroy,
  update,
  status,
};
