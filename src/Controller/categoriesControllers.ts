import { index } from "../Models/Categories";
import { destroy } from "../Models/Categories/destroy";
import { show } from "../Models/Categories/show";
import { store } from "../Models/Categories/store";

export const categoriesControllers = {
  store,
  index,
  show,
  destroy,
};
