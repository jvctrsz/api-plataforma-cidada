import { index } from "../Models/Secretariats";
import { show } from "../Models/Secretariats/show";
import { store } from "../Models/Secretariats/store";
import { update } from "../Models/Secretariats/update";

export const secretariatsController = {
  store,
  index,
  show,
  update,
};
