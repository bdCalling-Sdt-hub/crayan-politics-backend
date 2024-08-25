import { model, Schema } from 'mongoose';
import { ILearn } from './learn.interface';

const learnSchema = new Schema<ILearn>(
  {
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
  },
  { timestamps: true }
);

export const Learn = model('Learn', learnSchema);
