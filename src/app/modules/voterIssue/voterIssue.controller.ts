import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { paginationFields } from '../../../shared/constrant';
import pick from '../../../shared/pick';
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
  const paginationOptions = pick(req.query, paginationFields);
  const result = await VoterIssueService.getAllVoterIssueFromDB(
    paginationOptions
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'VoterIssue retrieved successfully',
    pagination: result.meta,
    data: result.data,
  });
});

const getIsIssueSubmit = catchAsync(async (req: Request, res: Response) => {
  const ip = req._remoteAddress || 'default-ip';
  const result = await VoterIssueService.getIsIssueSubmitFromDB(ip);

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
  getIsIssueSubmit,
};
