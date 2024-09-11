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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateService = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const unlinkFile_1 = __importDefault(require("../../../shared/unlinkFile"));
const candidate_constant_1 = require("./candidate.constant");
const candidate_model_1 = require("./candidate.model");
const addCandidateToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.color) {
        //@ts-ignore
        payload.color = candidate_constant_1.CandidateColorMapper[payload.politicalAffiliation];
    }
    const createCandidate = yield candidate_model_1.Candidate.create(payload);
    if (!createCandidate) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to add candidate');
    }
    return createCandidate;
});
const getAllCandidateFromDB = (paginationOptions, filterOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { skip, limit, page, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const { searchTerm } = filterOptions, otherFilters = __rest(filterOptions, ["searchTerm"]);
    let andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: ['name', 'state', 'politicalAffiliation', 'election'].map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(otherFilters).length) {
        andConditions.push({
            $and: Object.entries(otherFilters).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield candidate_model_1.Candidate.find(whereConditions).skip(skip).limit(limit);
    const total = yield candidate_model_1.Candidate.countDocuments(whereConditions);
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
const getSingleCandidateFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield candidate_model_1.Candidate.findById(id);
    if (!result) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Candidate Doesn't exist!");
    }
    return result;
});
const updateCandidateFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistCandidate = yield candidate_model_1.Candidate.findById(id);
    if (!isExistCandidate) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Candidate Doesn't exist!");
    }
    //set color
    //@ts-ignore
    payload.color = candidate_constant_1.CandidateColorMapper[payload.politicalAffiliation];
    //unlink file
    if (payload.image) {
        (0, unlinkFile_1.default)(isExistCandidate.image);
    }
    const updateCandidate = yield candidate_model_1.Candidate.findByIdAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return updateCandidate;
});
const deleteCandidateToDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteCandidate = yield candidate_model_1.Candidate.findByIdAndDelete(id);
    if (!deleteCandidate) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Candidate Doesn't exist!");
    }
    return deleteCandidate;
});
//issues post and update, delete
const updateCandidateIssuesToDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistCandidate = yield candidate_model_1.Candidate.findById(id);
    if (!isExistCandidate) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Candidate Doesn't exist!");
    }
    const updateCandidate = yield candidate_model_1.Candidate.findByIdAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return updateCandidate;
});
const deleteCandidateIssueToDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistCandidate = yield candidate_model_1.Candidate.findById(id);
    if (!isExistCandidate) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Candidate Doesn't exist!");
    }
    //update issues
    isExistCandidate.issues = [];
    yield isExistCandidate.save();
    return isExistCandidate;
});
exports.CandidateService = {
    addCandidateToDB,
    getAllCandidateFromDB,
    updateCandidateFromDB,
    deleteCandidateToDB,
    updateCandidateIssuesToDB,
    deleteCandidateIssueToDB,
    getSingleCandidateFromDB,
};
