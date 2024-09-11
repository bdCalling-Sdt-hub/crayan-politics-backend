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
exports.FaqService = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const faq_model_1 = require("./faq.model");
const createFaqToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createFaq = yield faq_model_1.Faq.create(payload);
    if (!createFaq) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to created faq!');
    }
    return createFaq;
});
const getAllFaqToDB = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield faq_model_1.Faq.find().sort(sortConditions).skip(skip).limit(limit);
    const total = yield faq_model_1.Faq.countDocuments();
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
const updateFaqToDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const faq = yield faq_model_1.Faq.findOneAndUpdate({ _id: id }, payload, { new: true });
    if (!faq) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Faq doesn't exist!");
    }
    return faq;
});
const deleteFaqToDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const faq = yield faq_model_1.Faq.findByIdAndDelete(id);
    if (!faq) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Faq doesn't exist!");
    }
    return faq;
});
exports.FaqService = {
    createFaqToDB,
    getAllFaqToDB,
    updateFaqToDB,
    deleteFaqToDB,
};
