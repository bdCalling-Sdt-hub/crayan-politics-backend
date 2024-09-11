"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Election = void 0;
const mongoose_1 = require("mongoose");
const electionSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.Election = (0, mongoose_1.model)('Election', electionSchema);
