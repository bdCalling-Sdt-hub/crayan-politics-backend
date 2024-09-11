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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Candidate = void 0;
const mongoose_1 = require("mongoose");
const candidate_constant_1 = require("./candidate.constant");
const issuesSchema = new mongoose_1.Schema({
    question: {
        type: String,
        required: true,
        trim: true,
    },
    answer: {
        type: String,
        required: true,
        trim: true,
    },
}, { _id: false });
const candidateSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    politicalAffiliation: {
        type: String,
        enum: candidate_constant_1.politicalAffiliation,
        required: true,
    },
    election: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        enum: candidate_constant_1.CandidateColors,
        required: true,
    },
    issues: {
        type: [issuesSchema],
        default: [],
    },
}, { timestamps: true });
candidateSchema.statics.getIssues = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield exports.Candidate.findById(id).select('+issues');
    return (_a = result === null || result === void 0 ? void 0 : result.issues) !== null && _a !== void 0 ? _a : null;
});
exports.Candidate = (0, mongoose_1.model)('Candidate', candidateSchema);
