"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Learn = void 0;
const mongoose_1 = require("mongoose");
const learnSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.Learn = (0, mongoose_1.model)('Learn', learnSchema);
