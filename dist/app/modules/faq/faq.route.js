"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const faq_controller_1 = require("./faq.controller");
const faq_validation_1 = require("./faq.validation");
const router = express_1.default.Router();
// frequently ask question (faq);
router.post('/create-faq', (0, auth_1.default)(user_1.USER_ROLES.ADMIN), (0, validateRequest_1.default)(faq_validation_1.FaqValidation.createFaqZodSchema), faq_controller_1.FaqController.createFaq);
router
    .route('/:id')
    .patch((0, auth_1.default)(user_1.USER_ROLES.ADMIN), (0, validateRequest_1.default)(faq_validation_1.FaqValidation.updateFaqZodSchema), faq_controller_1.FaqController.updateFaq)
    .delete((0, auth_1.default)(user_1.USER_ROLES.ADMIN), faq_controller_1.FaqController.deleteFaq);
router.get('/', faq_controller_1.FaqController.getAllFaq);
exports.FaqRoutes = router;
