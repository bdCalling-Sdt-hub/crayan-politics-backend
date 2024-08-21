import { model, Schema } from 'mongoose';
import { IElection } from './election.interface';

const electionSchema = new Schema<IElection>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Election = model<IElection>('Election', electionSchema);
