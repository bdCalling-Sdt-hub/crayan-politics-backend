"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearnRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const fileUploadHandler_1 = __importDefault(require("../../middlewares/fileUploadHandler"));
const learn_controller_1 = require("./learn.controller");
const router = express_1.default.Router();
router
    .route('/:id')
    .patch((0, auth_1.default)(user_1.USER_ROLES.ADMIN), (0, fileUploadHandler_1.default)(), learn_controller_1.LearnController.updateLearnTopic)
    .delete((0, auth_1.default)(user_1.USER_ROLES.ADMIN), learn_controller_1.LearnController.deleteLearnTopic);
router
    .route('/')
    .get(learn_controller_1.LearnController.getAllLearnTopic)
    .post((0, auth_1.default)(user_1.USER_ROLES.ADMIN), (0, fileUploadHandler_1.default)(), learn_controller_1.LearnController.createLearnTopic);
exports.LearnRoutes = router;
