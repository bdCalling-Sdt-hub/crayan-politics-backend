import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
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

const getAllSubscribeFromDB = async () => {
  const result = await Subscribe.find();
  return result;
};

export const SubscribeService = {
  createSubscribeToDB,
  getAllSubscribeFromDB,
};
