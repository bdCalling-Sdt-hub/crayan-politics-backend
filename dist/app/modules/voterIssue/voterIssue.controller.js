"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoterIssueController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const constrant_1 = require("../../../shared/constrant");
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const voterIssue_service_1 = require("./voterIssue.service");
const createVoterIssue = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const values = Object.assign({ ip: req._remoteAddress }, req.body);
    const result = yield voterIssue_service_1.VoterIssueService.createVoterIssueToDB(values);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'VoterIssue created successfully',
        data: result,
    });
}));
const getAllVoterIssue = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.default)(req.query, constrant_1.paginationFields);
    const result = yield voterIssue_service_1.VoterIssueService.getAllVoterIssueFromDB(paginationOptions);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'VoterIssue retrieved successfully',
        pagination: result.meta,
        data: result.data,
    });
}));
const getIsIssueSubmit = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ip = req._remoteAddress || 'default-ip';
    const result = yield voterIssue_service_1.VoterIssueService.getIsIssueSubmitFromDB(ip);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'VoterIssue retrieved successfully',
        data: result,
    });
}));
exports.VoterIssueController = {
    createVoterIssue,
    getAllVoterIssue,
    getIsIssueSubmit,
};
