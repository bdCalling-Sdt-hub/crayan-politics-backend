import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IState } from './state.interface';
import { State } from './state.model';

const createStateToDB = async (payload: IState) => {
  const createState = await State.create(payload);
  if (!createState) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to created ');
  }
  return createState;
};

const getAllStateFromDB = async () => {
  const result = await State.find();
  return result;
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
