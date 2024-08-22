import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IElection } from './election.interface';
import { Election } from './election.model';

const createElectionToDB = async (payload: IElection) => {
  const createElection = await Election.create(payload);
  if (!createElection) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to created ');
  }
  return createElection;
};

const getAllElectionFromDB = async () => {
  const result = await Election.find();
  return result;
};

const updateElectionFromDB = async (id: string, payload: IElection) => {
  const isExist = await Election.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  if (!isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Election Doesn't exist!");
  }
  return isExist;
};

const deleteElectionToDB = async (id: string) => {
  const deleteElection = await Election.findByIdAndDelete(id);
  if (!deleteElection) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Election Doesn't exist!");
  }
  return deleteElection;
};

export const ElectionService = {
  createElectionToDB,
  getAllElectionFromDB,
  updateElectionFromDB,
  deleteElectionToDB,
};
