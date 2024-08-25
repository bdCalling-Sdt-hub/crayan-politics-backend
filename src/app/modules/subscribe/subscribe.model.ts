import { model, Schema } from 'mongoose';
import { ISubscribe } from './subscribe.interface';

const subscribeSchema = new Schema<ISubscribe>(
  {
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Subscribe = model<ISubscribe>('Subscribe', subscribeSchema);
