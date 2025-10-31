import { index } from "../Models/Secretariats";
import { active } from "../Models/Secretariats/active";
import { change } from "../Models/Secretariats/change";
import { deactive } from "../Models/Secretariats/deactive";
import { destroy } from "../Models/Secretariats/destroy";
import { show } from "../Models/Secretariats/show";
import { store } from "../Models/Secretariats/store";
import { update } from "../Models/Secretariats/update";

export const secretariatsController = {
  store,
  index,
  show,
  update,
  destroy,
  active,
  deactive,
  change,
};
