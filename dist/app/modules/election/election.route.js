"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const election_controller_1 = require("./election.controller");
const router = express_1.default.Router();
router
    .route('/:id')
    .patch((0, auth_1.default)(user_1.USER_ROLES.ADMIN), election_controller_1.ElectionController.updateElection)
    .delete((0, auth_1.default)(user_1.USER_ROLES.ADMIN), election_controller_1.ElectionController.deleteElection);
router
    .route('/')
    .get(election_controller_1.ElectionController.getAllElection)
    .post((0, auth_1.default)(user_1.USER_ROLES.ADMIN), election_controller_1.ElectionController.createElection);
exports.ElectionRoutes = router;
