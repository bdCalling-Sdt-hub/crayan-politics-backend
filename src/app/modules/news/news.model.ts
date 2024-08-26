import { StatusCodes } from 'http-status-codes';
import { model, Schema } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { INews, NewsModel } from './news.interface';

const newsSchema = new Schema<INews, NewsModel>(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    highlight: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

newsSchema.statics.highlightSwitcher = async (id: string): Promise<any> => {
  const isExist = await News.findById(id);
  if (!isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "News doesn't exist!");
  }

  const updateNews = await News.findOneAndUpdate(
    { _id: id },
    { $set: { highlight: !isExist.highlight } },
    { new: true }
  );
  return updateNews;
};

export const News = model<INews, NewsModel>('News', newsSchema);
