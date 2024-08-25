import { StatusCodes } from 'http-status-codes';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../types/pagination';
import { IFeedback } from './feedback.interface';
import { Feedback } from './feedback.model';

const createFeedbackToDB = async (payload: IFeedback) => {
  const createFeedback = await Feedback.create(payload);
  if (!createFeedback) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to send feedback');
  }
  return createFeedback;
};

const getAllFeedbackFromDB = async (paginationOptions: IPaginationOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Feedback.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Feedback.countDocuments();
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

export const FeedbackService = {
  createFeedbackToDB,
  getAllFeedbackFromDB,
};
