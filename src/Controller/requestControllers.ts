import { index } from "../Models/Requests";
import { destroy } from "../Models/Requests/destroy";
import { destroyImages } from "../Models/Requests/destroyImages";
import { images } from "../Models/Requests/images";
import { messages } from "../Models/Requests/messages";
import { send } from "../Models/Requests/send";
import { show } from "../Models/Requests/show";
import { showImages } from "../Models/Requests/showImages";
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
  send,
  messages,
  images,
  showImages,
  destroyImages,
};
