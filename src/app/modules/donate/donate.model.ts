import { model, Schema } from 'mongoose';
import { IDonate } from './donate.interface';

const donateSchema = new Schema<IDonate>(
  {
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
  },
  { timestamps: true }
);

export const Donate = model<IDonate>('Donate', donateSchema);
