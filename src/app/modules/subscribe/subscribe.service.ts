import { StatusCodes } from 'http-status-codes';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../types/pagination';
import { ISubscribe } from './subscribe.interface';
import { Subscribe } from './subscribe.model';

const createSubscribeToDB = async (payload: ISubscribe) => {
  const createSubscribe = await Subscribe.create(payload);
  if (!createSubscribe) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Please try again, failed to send email.'
    );
  }
  return createSubscribe;
};

const getAllSubscribeFromDB = async (paginationOptions: IPaginationOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Subscribe.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Subscribe.countDocuments();
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

export const SubscribeService = {
  createSubscribeToDB,
  getAllSubscribeFromDB,
};
