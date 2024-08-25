import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import unlinkFile from '../../../shared/unlinkFile';
import { INews } from './news.interface';
import { News } from './news.model';

const createNewsToDB = async (payload: INews) => {
  const createNews = await News.create(payload);
  if (!createNews) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create News topic');
  }
  return createNews;
};

const getAllNewsFromDB = async () => {
  const result = await News.find();
  return result;
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
