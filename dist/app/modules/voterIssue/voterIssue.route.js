"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoterIssueRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const voterIssue_controller_1 = require("./voterIssue.controller");
const router = express_1.default.Router();
router.get('/is-issue-submit', voterIssue_controller_1.VoterIssueController.getIsIssueSubmit);
router
    .route('/')
    .get((0, auth_1.default)(user_1.USER_ROLES.ADMIN), voterIssue_controller_1.VoterIssueController.getAllVoterIssue)
    .post(voterIssue_controller_1.VoterIssueController.createVoterIssue);
exports.VoterIssueRoutes = router;
