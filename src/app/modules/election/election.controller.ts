import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { paginationFields } from '../../../shared/constrant';
import pick from '../../../shared/pick';
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

const getAllElection = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const result = await ElectionService.getAllElectionFromDB(paginationOptions);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Election date retrieved successfully',
    pagination: result.meta,
    data: result.data,
  });
});

const updateElection = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...electionData } = req.body;
  const result = await ElectionService.updateElectionFromDB(id, electionData);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Election date update successfully',
    data: result,
  });
});

const deleteElection = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ElectionService.deleteElectionToDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Election date deleted successfully',
    data: result,
  });
});

export const ElectionController = {
  createElection,
  getAllElection,
  updateElection,
  deleteElection,
};
