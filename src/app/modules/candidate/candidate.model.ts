import { model, Schema } from 'mongoose';
import { CandidateColors, politicalAffiliation } from './candidate.constant';
import { CandidateModel, ICandidate, IIssues } from './candidate.interface';

const issuesSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const candidateSchema = new Schema<ICandidate, CandidateModel>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    politicalAffiliation: {
      type: String,
      enum: politicalAffiliation,
      required: true,
    },
    election: {
      type: String,
      required: true,
    },
    state: {
      type: [String],
      required: true,
    },
    color: {
      type: String,
      enum: CandidateColors,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    issues: {
      type: [issuesSchema],
      default: [],
    },
  },
  { timestamps: true }
);

candidateSchema.statics.getIssues = async (
  id: string
): Promise<IIssues[] | null> => {
  const result = await Candidate.findById(id).select('+issues');
  return result?.issues ?? null;
};

export const Candidate = model<ICandidate, CandidateModel>(
  'Candidate',
  candidateSchema
);
