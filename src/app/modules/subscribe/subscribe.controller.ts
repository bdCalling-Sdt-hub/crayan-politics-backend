import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { paginationFields } from '../../../shared/constrant';
import pick from '../../../shared/pick';
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
  const paginationOptions = pick(req.query, paginationFields);
  const result = await SubscribeService.getAllSubscribeFromDB(
    paginationOptions
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Subscribe retrieved successfully',
    pagination: result.meta,
    data: result.data,
  });
});

export const SubscribeController = {
  createSubscribe,
  getAllSubscribe,
};
