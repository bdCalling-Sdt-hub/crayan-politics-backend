import { StatusCodes } from 'http-status-codes';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import unlinkFile from '../../../shared/unlinkFile';
import { IPaginationOptions } from '../../../types/pagination';
import { INews } from './news.interface';
import { News } from './news.model';

const createNewsToDB = async (payload: INews) => {
  const createNews = await News.create(payload);
  if (!createNews) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create News topic');
  }
  return createNews;
};

const getAllNewsFromDB = async (paginationOptions: IPaginationOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await News.find().sort(sortConditions).skip(skip).limit(limit);
  const total = await News.countDocuments();
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

const getSingleNewsFromDB = async (id: string) => {
  const isExist = await News.findById(id);
  if (!isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "News doesn't exist!");
  }
  return isExist;
};
const getTopNewsFromDB = async () => {
  const isExist = await News.findOne().sort({ createdAt: 'desc' });
  return isExist;
};

const updateNewsToDB = async (id: string, payload: INews) => {
  console.log(payload);
  const isExist = await News.findById(id);
  if (!isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "News doesn't exist!");
  }

  //unlink file
  if (payload.image) {
    unlinkFile(isExist.image);
  }

  const updateDoc = await News.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return updateDoc;
};

const deleteNewsFromDB = async (id: string) => {
  const isExist = await News.findByIdAndDelete(id);
  if (!isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "News doesn't exist!");
  }
  return isExist;
};

export const NewsService = {
  createNewsToDB,
  getAllNewsFromDB,
  deleteNewsFromDB,
  updateNewsToDB,
  getSingleNewsFromDB,
  getTopNewsFromDB,
};
