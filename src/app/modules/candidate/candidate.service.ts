import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import unlinkFile from '../../../shared/unlinkFile';
import { CandidateColorMapper } from './candidate.constant';
import { ICandidate } from './candidate.interface';
import { Candidate } from './candidate.model';

const addCandidateToDB = async (payload: ICandidate) => {
  if (!payload.color) {
    //@ts-ignore
    payload.color = CandidateColorMapper[payload.politicalAffiliation];
  }
  const createCandidate = await Candidate.create(payload);
  if (!createCandidate) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to add candidate');
  }
  return createCandidate;
};

const getAllCandidateFromDB = async () => {
  const result = await Candidate.find();
  return result;
};

const getSingleCandidateFromDB = async (id: string) => {
  const result = await Candidate.findById(id);
  if (!result) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Candidate Doesn't exist!");
  }
  return result;
};

const updateCandidateFromDB = async (id: string, payload: ICandidate) => {
  const isExistCandidate = await Candidate.findById(id);
  if (!isExistCandidate) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Candidate Doesn't exist!");
  }

  //set color
  //@ts-ignore
  payload.color = CandidateColorMapper[payload.politicalAffiliation];

  //unlink file
  if (payload.image) {
    unlinkFile(isExistCandidate.image);
  }

  const updateCandidate = await Candidate.findByIdAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );

  return updateCandidate;
};

const deleteCandidateToDB = async (id: string) => {
  const deleteCandidate = await Candidate.findByIdAndDelete(id);
  if (!deleteCandidate) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Candidate Doesn't exist!");
  }
  return deleteCandidate;
};

//issues post and update, delete
const updateCandidateIssuesToDB = async (id: string, payload: ICandidate) => {
  const isExistCandidate = await Candidate.findById(id);
  if (!isExistCandidate) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Candidate Doesn't exist!");
  }

  const updateCandidate = await Candidate.findByIdAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );

  return updateCandidate;
};

const deleteCandidateIssueToDB = async (id: string) => {
  const isExistCandidate = await Candidate.findById(id);
  if (!isExistCandidate) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Candidate Doesn't exist!");
  }

  //update issues
  isExistCandidate.issues = [];
  await isExistCandidate.save();

  return isExistCandidate;
};

export const CandidateService = {
  addCandidateToDB,
  getAllCandidateFromDB,
  updateCandidateFromDB,
  deleteCandidateToDB,
  updateCandidateIssuesToDB,
  deleteCandidateIssueToDB,
  getSingleCandidateFromDB,
};
