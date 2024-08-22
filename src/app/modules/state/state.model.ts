import { model, Schema } from 'mongoose';
import { IState } from './state.interface';

const stateSchema = new Schema<IState>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const State = model<IState>('State', stateSchema);
