import { StatusCodes } from 'http-status-codes';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from './../../../types/pagination';
import { IFaq } from './faq.interface';
import { Faq } from './faq.model';

const createFaqToDB = async (payload: IFaq): Promise<IFaq> => {
  const createFaq = await Faq.create(payload);
  if (!createFaq) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to created faq!');
  }

  return createFaq;
};

const getAllFaqToDB = async (paginationOptions: IPaginationOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Faq.find().sort(sortConditions).skip(skip).limit(limit);
  const total = await Faq.countDocuments();
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

const updateFaqToDB = async (
  id: string,
  payload: IFaq
): Promise<IFaq | null> => {
  const faq = await Faq.findOneAndUpdate({ _id: id }, payload, { new: true });
  if (!faq) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Faq doesn't exist!");
  }

  return faq;
};

const deleteFaqToDB = async (id: string): Promise<IFaq> => {
  const faq = await Faq.findByIdAndDelete(id);

  if (!faq) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Faq doesn't exist!");
  }

  return faq;
};

export const FaqService = {
  createFaqToDB,
  getAllFaqToDB,
  updateFaqToDB,
  deleteFaqToDB,
};
