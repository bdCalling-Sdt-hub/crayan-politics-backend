"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const subscribe_controller_1 = require("./subscribe.controller");
const router = express_1.default.Router();
router
    .route('/')
    .get((0, auth_1.default)(user_1.USER_ROLES.ADMIN), subscribe_controller_1.SubscribeController.getAllSubscribe)
    .post(subscribe_controller_1.SubscribeController.createSubscribe);
exports.SubscribeRoutes = router;
