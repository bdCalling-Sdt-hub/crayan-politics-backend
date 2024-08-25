import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IDonate } from './donate.interface';
import { Donate } from './donate.model';

const createDonateToDB = async (payload: IDonate) => {
  const createDonate = await Donate.create(payload);
  if (!createDonate) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to created ');
  }
  return createDonate;
};

const getAllDonateFromDB = async () => {
  const result = await Donate.find();
  return result;
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
