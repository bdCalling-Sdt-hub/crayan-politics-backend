import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IFeedback } from './feedback.interface';
import { Feedback } from './feedback.model';

const createFeedbackToDB = async (payload: IFeedback) => {
  const createFeedback = await Feedback.create(payload);
  if (!createFeedback) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to send feedback');
  }
  return createFeedback;
};

const getAllFeedbackFromDB = async () => {
  const result = await Feedback.find();
  return result;
};

export const FeedbackService = {
  createFeedbackToDB,
  getAllFeedbackFromDB,
};
