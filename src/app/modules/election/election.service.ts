import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IElection } from './election.interface';
import { Election } from './election.model';

const createElectionToDB = async (payload: IElection) => {
  const createElection = await Election.create(payload);
  if (!createElection) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to created ');
  }
};

export const ElectionService = {
  createElectionToDB,
};
