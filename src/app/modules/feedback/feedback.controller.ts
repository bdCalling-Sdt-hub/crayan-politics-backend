import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { FeedbackService } from './feedback.service';

const createFeedback = catchAsync(async (req: Request, res: Response) => {
  const { ...FeedbackData } = req.body;
  const result = await FeedbackService.createFeedbackToDB(FeedbackData);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Feedback created successfully',
    data: result,
  });
});

const getAllFeedback = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedbackService.getAllFeedbackFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Feedback retrieved successfully',
    data: result,
  });
});

export const FeedbackController = {
  createFeedback,
  getAllFeedback,
};
