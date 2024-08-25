import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CandidateService } from './candidate.service';

const addCandidate = catchAsync(async (req: Request, res: Response) => {
  let image;
  if (req.files && 'image' in req.files && req.files.image[0]) {
    image = `/images/${req.files.image[0].filename}`;
  }
  const values = {
    image,
    ...req.body,
  };
  const result = await CandidateService.addCandidateToDB(values);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Candidate added successfully',
    data: result,
  });
});

const getAllCandidate = catchAsync(async (req: Request, res: Response) => {
  const result = await CandidateService.getAllCandidateFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All Candidate retrieved successfully',
    data: result,
  });
});

const getSingleCandidate = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CandidateService.getSingleCandidateFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Single Candidate retrieved successfully',
    data: result,
  });
});

const updateCandidate = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  let image;
  if (req.files && 'image' in req.files && req.files.image[0]) {
    image = `/images/${req.files.image[0].filename}`;
  }
  const values = {
    image,
    ...req.body,
  };
  const result = await CandidateService.updateCandidateFromDB(id, values);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Candidate date update successfully',
    data: result,
  });
});

const deleteCandidate = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CandidateService.deleteCandidateToDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Candidate date deleted successfully',
    data: result,
  });
});

//issues
const updateCandidateIssues = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const { ...issuesData } = req.body;
    const result = await CandidateService.updateCandidateIssuesToDB(
      id,
      issuesData
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Candidate issues data added successfully',
      data: result,
    });
  }
);

const deleteCandidateIssue = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CandidateService.deleteCandidateIssueToDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Candidate issue deleted successfully',
    data: result,
  });
});

export const CandidateController = {
  addCandidate,
  getAllCandidate,
  updateCandidate,
  deleteCandidate,
  updateCandidateIssues,
  deleteCandidateIssue,
  getSingleCandidate,
};
