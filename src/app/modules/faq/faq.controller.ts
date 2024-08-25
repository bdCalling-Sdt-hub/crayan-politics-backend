import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { paginationFields } from '../../../shared/constrant';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { FaqService } from './faq.service';

const createFaq = catchAsync(async (req: Request, res: Response) => {
  const { ...faqData } = req.body;
  const result = await FaqService.createFaqToDB(faqData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Frequently ask question created successfully!',
    data: result,
  });
});

const getAllFaq = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const result = await FaqService.getAllFaqToDB(paginationOptions);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Frequently ask question retrieved successfully!',
    pagination: result.meta,
    data: result.data,
  });
});
const updateFaq = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...updateFaqData } = req.body;
  const result = await FaqService.updateFaqToDB(id, updateFaqData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Frequently ask question updated successfully!',
    data: result,
  });
});
const deleteFaq = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FaqService.deleteFaqToDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Frequently ask question delete successfully!',
    data: result,
  });
});

export const FaqController = { createFaq, getAllFaq, updateFaq, deleteFaq };
