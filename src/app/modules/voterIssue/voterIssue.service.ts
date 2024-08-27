import { StatusCodes } from 'http-status-codes';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../types/pagination';
import { IVoterIssue } from './voterIssue.interface';
import { VoterIssue } from './voterIssue.model';

const createVoterIssueToDB = async (payload: IVoterIssue) => {
  const createVoterIssue = await VoterIssue.create(payload);
  if (!createVoterIssue) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to send VoterIssue');
  }
  return createVoterIssue;
};

const getAllVoterIssueFromDB = async (
  paginationOptions: IPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await VoterIssue.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await VoterIssue.countDocuments();
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

const getIsIssueSubmitFromDB = async (ip: string) => {
  const isExistIp = await VoterIssue.findOne({ ip: { $eq: ip } });
  return !!isExistIp;
};

export const VoterIssueService = {
  createVoterIssueToDB,
  getAllVoterIssueFromDB,
  getIsIssueSubmitFromDB,
};
