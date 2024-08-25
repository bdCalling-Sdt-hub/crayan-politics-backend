import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Stripe from 'stripe';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import { paginationFields } from '../../../shared/constrant';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { DonateService } from './donate.service';
const stripe = new Stripe(config.stipe_key_secret as string);

const createDonate = catchAsync(async (req: Request, res: Response) => {
  const { ...donateData } = req.body;
  const result = await DonateService.createDonateToDB(donateData);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Donation created successfully',
    data: result,
  });
});

const getAllDonateList = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const result = await DonateService.getAllDonateFromDB(paginationOptions);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Donate retrieved successfully',
    pagination: result.meta,
    data: result.data,
  });
});

//stripe payment intent
const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
  const { price } = req.body;

  if (typeof price !== 'number' || price <= 0) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid price amount');
  }
  const amount = Math.trunc(price * 100);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    payment_method_types: ['card'],
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Payment intent created successfully',
    data: {
      client_secret: paymentIntent.client_secret,
    },
  });
});

export const DonateController = {
  createDonate,
  getAllDonateList,
  createPaymentIntent,
};
