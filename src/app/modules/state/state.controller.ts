import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StateService } from './state.service';

const createState = catchAsync(async (req: Request, res: Response) => {
  const { ...StateData } = req.body;
  const result = await StateService.createStateToDB(StateData);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'State created successfully',
    data: result,
  });
});

const getAllState = catchAsync(async (req: Request, res: Response) => {
  const result = await StateService.getAllStateFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'State retrieved successfully',
    data: result,
  });
});

const updateState = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...StateData } = req.body;
  const result = await StateService.updateStateFromDB(id, StateData);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'State update successfully',
    data: result,
  });
});

const deleteState = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StateService.deleteStateToDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'State deleted successfully',
    data: result,
  });
});

export const StateController = {
  createState,
  getAllState,
  updateState,
  deleteState,
};
