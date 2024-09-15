import { StatusCodes } from 'http-status-codes';
import { model, Schema } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { IVoterIssue } from './voterIssue.interface';

const voterIssueSchema = new Schema<IVoterIssue>(
  {
    state: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
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
  },
  { timestamps: true }
);

voterIssueSchema.pre('save', async function () {
  const isExist = await VoterIssue.findOne({ ip: this.ip });
  if (isExist) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'You already submit the issues'
    );
  }
});

export const VoterIssue = model<IVoterIssue>('VoterIssue', voterIssueSchema);
