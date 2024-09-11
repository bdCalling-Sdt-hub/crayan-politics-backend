"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Donate = void 0;
const mongoose_1 = require("mongoose");
const donateSchema = new mongoose_1.Schema({
    trxId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    card: {
        type: Number,
    },
}, { timestamps: true });
exports.Donate = (0, mongoose_1.model)('Donate', donateSchema);
