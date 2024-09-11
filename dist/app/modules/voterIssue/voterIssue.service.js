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
exports.VoterIssueService = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const voterIssue_model_1 = require("./voterIssue.model");
const createVoterIssueToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createVoterIssue = yield voterIssue_model_1.VoterIssue.create(payload);
    if (!createVoterIssue) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to send VoterIssue');
    }
    return createVoterIssue;
});
const getAllVoterIssueFromDB = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield voterIssue_model_1.VoterIssue.find()
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield voterIssue_model_1.VoterIssue.countDocuments();
    const totalPage = Math.ceil(total / limit);
    return {
        meta: {
            page,
            limit,
            total,
            totalPage,
        },
        data: result,
    };
});
const getIsIssueSubmitFromDB = (ip) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistIp = yield voterIssue_model_1.VoterIssue.findOne({ ip: { $eq: ip } });
    return !!isExistIp;
});
exports.VoterIssueService = {
    createVoterIssueToDB,
    getAllVoterIssueFromDB,
    getIsIssueSubmitFromDB,
};
