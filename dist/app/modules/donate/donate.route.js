"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonateRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const donate_controller_1 = require("./donate.controller");
const router = express_1.default.Router();
router.post('/create-payment-intent', donate_controller_1.DonateController.createPaymentIntent);
router
    .route('/')
    .get((0, auth_1.default)(user_1.USER_ROLES.ADMIN), donate_controller_1.DonateController.getAllDonateList)
    .post(donate_controller_1.DonateController.createDonate);
exports.DonateRoutes = router;
