import { StatusCodes } from 'http-status-codes';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../types/pagination';
import { IState } from './state.interface';
import { State } from './state.model';

const createStateToDB = async (payload: IState) => {
  const createState = await State.create(payload);
  if (!createState) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to created ');
  }
  return createState;
};

const getAllStateFromDB = async (paginationOptions: IPaginationOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await State.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await State.countDocuments();
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

const updateStateFromDB = async (id: string, payload: IState) => {
  const isExist = await State.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  if (!isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "State Doesn't exist!");
  }
  return isExist;
};

const deleteStateToDB = async (id: string) => {
  const deleteState = await State.findByIdAndDelete(id);
  if (!deleteState) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "State Doesn't exist!");
  }
  return deleteState;
};

export const StateService = {
  createStateToDB,
  getAllStateFromDB,
  updateStateFromDB,
  deleteStateToDB,
};
