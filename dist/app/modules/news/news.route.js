"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const fileUploadHandler_1 = __importDefault(require("../../middlewares/fileUploadHandler"));
const news_controller_1 = require("./news.controller");
const router = express_1.default.Router();
router.post('/create-news', (0, auth_1.default)(user_1.USER_ROLES.ADMIN), (0, fileUploadHandler_1.default)(), news_controller_1.NewsController.createNews);
router.get('/top-news', news_controller_1.NewsController.getTopNews);
router.patch('/highlight/:id', (0, auth_1.default)(user_1.USER_ROLES.ADMIN), news_controller_1.NewsController.highlightNews);
router.get('/highlight', news_controller_1.NewsController.getAllHighlightNews);
router
    .route('/:id')
    .get(news_controller_1.NewsController.getSingleNews)
    .patch((0, auth_1.default)(user_1.USER_ROLES.ADMIN), (0, fileUploadHandler_1.default)(), news_controller_1.NewsController.updateNews)
    .delete((0, auth_1.default)(user_1.USER_ROLES.ADMIN), news_controller_1.NewsController.deleteNews);
router.get('/', news_controller_1.NewsController.getAllNews);
exports.NewsRoutes = router;
