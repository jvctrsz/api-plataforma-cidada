import { index } from "../Models/Requests";
import { destroy } from "../Models/Requests/destroy";
import { images } from "../Models/Requests/images";
import { messages } from "../Models/Requests/messages";
import { secretariat } from "../Models/Requests/secretariat";
import { send } from "../Models/Requests/send";
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
  secretariat,
  send,
  messages,
  images,
};
