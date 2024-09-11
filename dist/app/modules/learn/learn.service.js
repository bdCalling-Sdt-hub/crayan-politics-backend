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
exports.LearnService = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const unlinkFile_1 = __importDefault(require("../../../shared/unlinkFile"));
const learn_model_1 = require("./learn.model");
const createLearnTopicToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createLearnTopic = yield learn_model_1.Learn.create(payload);
    if (!createLearnTopic) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to create Learn topic');
    }
    return createLearnTopic;
});
const getAllLearnTopicFromDB = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield learn_model_1.Learn.find()
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield learn_model_1.Learn.countDocuments();
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
const updateLearnTopicToDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const isExist = yield learn_model_1.Learn.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Learn topic doesn't exist!");
    }
    //unlink file
    if (payload.image) {
        (0, unlinkFile_1.default)(isExist.image);
    }
    const updateDoc = yield learn_model_1.Learn.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return updateDoc;
});
const deleteLearnTopicFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield learn_model_1.Learn.findByIdAndDelete(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Learn topic doesn't exist!");
    }
    return isExist;
});
exports.LearnService = {
    createLearnTopicToDB,
    getAllLearnTopicFromDB,
    deleteLearnTopicFromDB,
    updateLearnTopicToDB,
};
