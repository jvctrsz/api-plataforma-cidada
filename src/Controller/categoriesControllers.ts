import { index } from "../Models/Categories";
import { destroy } from "../Models/Categories/destroy";
import { show } from "../Models/Categories/show";
import { store } from "../Models/Categories/store";
import { update } from "../Models/Categories/update";

export const categoriesControllers = {
  store,
  index,
  show,
  destroy,
  update,
};
