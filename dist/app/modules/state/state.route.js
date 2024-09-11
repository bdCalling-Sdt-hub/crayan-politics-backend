"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const state_controller_1 = require("./state.controller");
const router = express_1.default.Router();
router
    .route('/:id')
    .patch((0, auth_1.default)(user_1.USER_ROLES.ADMIN), state_controller_1.StateController.updateState)
    .delete((0, auth_1.default)(user_1.USER_ROLES.ADMIN), state_controller_1.StateController.deleteState);
router
    .route('/')
    .get(state_controller_1.StateController.getAllState)
    .post((0, auth_1.default)(user_1.USER_ROLES.ADMIN), state_controller_1.StateController.createState);
exports.StateRoutes = router;
