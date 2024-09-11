"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const fileUploadHandler_1 = __importDefault(require("../../middlewares/fileUploadHandler"));
const candidate_controller_1 = require("./candidate.controller");
const router = express_1.default.Router();
router.post('/add-candidate', (0, auth_1.default)(user_1.USER_ROLES.ADMIN), (0, fileUploadHandler_1.default)(), candidate_controller_1.CandidateController.addCandidate);
router
    .route('/:id')
    .get(candidate_controller_1.CandidateController.getSingleCandidate)
    .patch((0, auth_1.default)(user_1.USER_ROLES.ADMIN), (0, fileUploadHandler_1.default)(), candidate_controller_1.CandidateController.updateCandidate)
    .delete((0, auth_1.default)(user_1.USER_ROLES.ADMIN), candidate_controller_1.CandidateController.deleteCandidate);
//candidate issues
router
    .route('/candidate-issues/:id')
    .patch((0, auth_1.default)(user_1.USER_ROLES.ADMIN), candidate_controller_1.CandidateController.updateCandidateIssues)
    .delete((0, auth_1.default)(user_1.USER_ROLES.ADMIN), candidate_controller_1.CandidateController.deleteCandidateIssue);
router.get('/', candidate_controller_1.CandidateController.getAllCandidate);
exports.CandidateRoutes = router;
