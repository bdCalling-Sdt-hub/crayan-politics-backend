import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ElectionService } from './election.service';

const createElection = catchAsync(async (req: Request, res: Response) => {
  const { ...electionData } = req.body;

  const result = await ElectionService.createElectionToDB(electionData);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Election created successfully',
    data: result,
  });
});

export const ElectionController = {
  createElection,
};
