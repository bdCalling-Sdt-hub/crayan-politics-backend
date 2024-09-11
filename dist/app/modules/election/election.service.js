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
exports.ElectionService = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const election_model_1 = require("./election.model");
const createElectionToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createElection = yield election_model_1.Election.create(payload);
    if (!createElection) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to created ');
    }
    return createElection;
});
const getAllElectionFromDB = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield election_model_1.Election.find()
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield election_model_1.Election.countDocuments();
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
const updateElectionFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield election_model_1.Election.findByIdAndUpdate({ _id: id }, payload, {
        new: true,
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Election Doesn't exist!");
    }
    return isExist;
});
const deleteElectionToDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteElection = yield election_model_1.Election.findByIdAndDelete(id);
    if (!deleteElection) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Election Doesn't exist!");
    }
    return deleteElection;
});
exports.ElectionService = {
    createElectionToDB,
    getAllElectionFromDB,
    updateElectionFromDB,
    deleteElectionToDB,
};
