import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SubscribeService } from './subscribe.service';

const createSubscribe = catchAsync(async (req: Request, res: Response) => {
  const { ...SubscribeData } = req.body;
  const result = await SubscribeService.createSubscribeToDB(SubscribeData);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Subscribe created successfully',
    data: result,
  });
});

const getAllSubscribe = catchAsync(async (req: Request, res: Response) => {
  const result = await SubscribeService.getAllSubscribeFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Subscribe retrieved successfully',
    data: result,
  });
});

export const SubscribeController = {
  createSubscribe,
  getAllSubscribe,
};
