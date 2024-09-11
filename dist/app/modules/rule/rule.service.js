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
exports.RuleService = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const rule_model_1 = require("./rule.model");
//privacy policy
const createPrivacyPolicyToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistPrivacy = yield rule_model_1.Rule.findOne({ type: 'privacy' });
    if (isExistPrivacy) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Privacy policy already exist!');
    }
    else {
        const result = yield rule_model_1.Rule.create(Object.assign(Object.assign({}, payload), { type: 'privacy' }));
        return result;
    }
});
const getPrivacyPolicyFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rule_model_1.Rule.findOne({ type: 'privacy' });
    if (!result) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Privacy policy doesn't exist!");
    }
    return result;
});
const updatePrivacyPolicyToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistPrivacy = yield rule_model_1.Rule.findOne({ type: 'privacy' });
    if (!isExistPrivacy) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Privacy policy doesn't exist!");
    }
    const result = yield rule_model_1.Rule.findOneAndUpdate({ type: 'privacy' }, payload, {
        new: true,
    });
    return result;
});
//terms and conditions
const createTermsAndConditionToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistTerms = yield rule_model_1.Rule.findOne({ type: 'terms' });
    if (isExistTerms) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Terms and conditions already exist!');
    }
    else {
        const result = yield rule_model_1.Rule.create(Object.assign(Object.assign({}, payload), { type: 'terms' }));
        return result;
    }
});
const getTermsAndConditionFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rule_model_1.Rule.findOne({ type: 'terms' });
    if (!result) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Terms and conditions doesn't  exist!");
    }
    return result;
});
const updateTermsAndConditionToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistTerms = yield rule_model_1.Rule.findOne({ type: 'terms' });
    if (!isExistTerms) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Terms and conditions doesn't  exist!");
    }
    const result = yield rule_model_1.Rule.findOneAndUpdate({ type: 'terms' }, payload, {
        new: true,
    });
    return result;
});
//privacy policy
const createAboutToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistAbout = yield rule_model_1.Rule.findOne({ type: 'about' });
    if (isExistAbout) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'About already exist!');
    }
    else {
        const result = yield rule_model_1.Rule.create(Object.assign(Object.assign({}, payload), { type: 'about' }));
        return result;
    }
});
const getAboutFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rule_model_1.Rule.findOne({ type: 'about' });
    if (!result) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "About doesn't exist!");
    }
    return result;
});
const updateAboutToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistPrivacy = yield rule_model_1.Rule.findOne({ type: 'about' });
    if (!isExistPrivacy) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "About doesn't exist!");
    }
    const result = yield rule_model_1.Rule.findOneAndUpdate({ type: 'about' }, payload, {
        new: true,
    });
    return result;
});
exports.RuleService = {
    createPrivacyPolicyToDB,
    updatePrivacyPolicyToDB,
    getPrivacyPolicyFromDB,
    createTermsAndConditionToDB,
    getTermsAndConditionFromDB,
    updateTermsAndConditionToDB,
    createAboutToDB,
    updateAboutToDB,
    getAboutFromDB,
};
