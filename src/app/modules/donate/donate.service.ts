import { StatusCodes } from 'http-status-codes';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../types/pagination';
import { IDonate } from './donate.interface';
import { Donate } from './donate.model';

const createDonateToDB = async (payload: IDonate) => {
  const createDonate = await Donate.create(payload);
  if (!createDonate) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to created ');
  }
  return createDonate;
};

const getAllDonateFromDB = async (paginationOptions: IPaginationOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Donate.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Donate.countDocuments();
  const totalPage = Math.ceil(total / limit);

  const donateAggregate = await Donate.aggregate([
    { $group: { _id: null, totalDonation: { $sum: '$amount' } } },
  ]);
  const totalDonation = donateAggregate[0].totalDonation;
  return {
    meta: { page, limit, total, totalPage },
    data: { totalDonation, data: result },
  };
};

const updateDonateFromDB = async (id: string, payload: IDonate) => {
  const isExist = await Donate.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  if (!isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Donate Doesn't exist!");
  }
  return isExist;
};

const deleteDonateToDB = async (id: string) => {
  const deleteDonate = await Donate.findByIdAndDelete(id);
  if (!deleteDonate) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Donate Doesn't exist!");
  }
  return deleteDonate;
};

export const DonateService = {
  createDonateToDB,
  getAllDonateFromDB,
  updateDonateFromDB,
  deleteDonateToDB,
};
