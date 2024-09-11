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
exports.NewsService = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const unlinkFile_1 = __importDefault(require("../../../shared/unlinkFile"));
const news_model_1 = require("./news.model");
const createNewsToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createNews = yield news_model_1.News.create(payload);
    if (!createNews) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to create News topic');
    }
    return createNews;
});
const getAllNewsFromDB = (paginationOptions, filterOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const { searchTerm } = filterOptions;
    const topNews = yield news_model_1.News.findOne().sort({ createdAt: 'desc' });
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    let searchConditions = {};
    if (searchTerm) {
        searchConditions = {
            $or: ['title', 'description'].map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        };
    }
    searchConditions = { _id: { $ne: topNews === null || topNews === void 0 ? void 0 : topNews._id } };
    const result = yield news_model_1.News.find(searchConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield news_model_1.News.countDocuments(searchConditions);
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
const getSingleNewsFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield news_model_1.News.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "News doesn't exist!");
    }
    return isExist;
});
const getTopNewsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield news_model_1.News.findOne().sort({ createdAt: 'desc' });
    return isExist;
});
const updateNewsToDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const isExist = yield news_model_1.News.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "News doesn't exist!");
    }
    //unlink file
    if (payload.image) {
        (0, unlinkFile_1.default)(isExist.image);
    }
    const updateDoc = yield news_model_1.News.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return updateDoc;
});
const deleteNewsFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield news_model_1.News.findByIdAndDelete(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "News doesn't exist!");
    }
    return isExist;
});
//highlight
const getAllHighlightNewsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield news_model_1.News.find({ highlight: { $eq: true } });
    return result;
});
const highlightNewsToDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const updateDoc = yield news_model_1.News.highlightSwitcher(id);
    return updateDoc;
});
exports.NewsService = {
    createNewsToDB,
    getAllNewsFromDB,
    deleteNewsFromDB,
    updateNewsToDB,
    getSingleNewsFromDB,
    getTopNewsFromDB,
    highlightNewsToDB,
    getAllHighlightNewsFromDB,
};
