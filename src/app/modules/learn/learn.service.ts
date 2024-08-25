import { StatusCodes } from 'http-status-codes';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import unlinkFile from '../../../shared/unlinkFile';
import { IPaginationOptions } from './../../../types/pagination';
import { ILearn } from './learn.interface';
import { Learn } from './learn.model';

const createLearnTopicToDB = async (payload: ILearn) => {
  const createLearnTopic = await Learn.create(payload);
  if (!createLearnTopic) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create Learn topic');
  }
  return createLearnTopic;
};

const getAllLearnTopicFromDB = async (
  paginationOptions: IPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Learn.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Learn.countDocuments();
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
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
