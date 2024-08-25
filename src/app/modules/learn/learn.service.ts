import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import unlinkFile from '../../../shared/unlinkFile';
import { ILearn } from './learn.interface';
import { Learn } from './learn.model';

const createLearnTopicToDB = async (payload: ILearn) => {
  const createLearnTopic = await Learn.create(payload);
  if (!createLearnTopic) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create Learn topic');
  }
  return createLearnTopic;
};

const getAllLearnTopicFromDB = async () => {
  const result = await Learn.find();

  return result;
};

const updateLearnTopicToDB = async (id: string, payload: ILearn) => {
  console.log(payload);
  const isExist = await Learn.findById(id);
  if (!isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Learn topic doesn't exist!");
  }

  //unlink file
  if (payload.image) {
    unlinkFile(isExist.image);
  }

  const updateDoc = await Learn.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return updateDoc;
};

const deleteLearnTopicFromDB = async (id: string) => {
  const isExist = await Learn.findByIdAndDelete(id);
  if (!isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Learn topic doesn't exist!");
  }
  return isExist;
};

export const LearnService = {
  createLearnTopicToDB,
  getAllLearnTopicFromDB,
  deleteLearnTopicFromDB,
  updateLearnTopicToDB,
};
