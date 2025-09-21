"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const Users_1 = require("../Models/Users");
const change_1 = require("../Models/Users/change");
const destroy_1 = require("../Models/Users/destroy");
const recovey_1 = require("../Models/Users/recovey");
const redefine_1 = require("../Models/Users/redefine");
const show_1 = require("../Models/Users/show");
const store_1 = require("../Models/Users/store");
const update_1 = require("../Models/Users/update");
exports.usersController = {
    store: store_1.store,
    index: Users_1.index,
    show: show_1.show,
    destroy: destroy_1.destroy,
    update: update_1.update,
    change: change_1.change,
    recovery: recovey_1.recovery,
    redefine: redefine_1.redefine,
};
