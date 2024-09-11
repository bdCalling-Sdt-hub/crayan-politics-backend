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
exports.VoterIssue = void 0;
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = require("mongoose");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const voterIssueSchema = new mongoose_1.Schema({
    state: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    issues: {
        type: [String],
        required: true,
    },
    ip: {
        type: String,
        required: true,
        select: 0,
    },
}, { timestamps: true });
voterIssueSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const isExist = yield exports.VoterIssue.findOne({ ip: this.ip });
        if (isExist) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'You already submit the issues');
        }
    });
});
exports.VoterIssue = (0, mongoose_1.model)('VoterIssue', voterIssueSchema);
