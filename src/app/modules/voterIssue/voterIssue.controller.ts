import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { VoterIssueService } from './voterIssue.service';

const createVoterIssue = catchAsync(async (req: Request, res: Response) => {
  const values = {
    ip: req._remoteAddress,
    ...req.body,
  };
  const result = await VoterIssueService.createVoterIssueToDB(values);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'VoterIssue created successfully',
    data: result,
  });
});

const getAllVoterIssue = catchAsync(async (req: Request, res: Response) => {
  const result = await VoterIssueService.getAllVoterIssueFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'VoterIssue retrieved successfully',
    data: result,
  });
});

export const VoterIssueController = {
  createVoterIssue,
  getAllVoterIssue,
};
