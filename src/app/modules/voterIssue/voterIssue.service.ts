import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IVoterIssue } from './voterIssue.interface';
import { VoterIssue } from './voterIssue.model';

const createVoterIssueToDB = async (payload: IVoterIssue) => {
  const createVoterIssue = await VoterIssue.create(payload);
  if (!createVoterIssue) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to send VoterIssue');
  }
  return createVoterIssue;
};

const getAllVoterIssueFromDB = async () => {
  const result = await VoterIssue.find();
  return result;
};

export const VoterIssueService = {
  createVoterIssueToDB,
  getAllVoterIssueFromDB,
};
