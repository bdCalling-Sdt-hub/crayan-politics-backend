import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { paginationFields } from '../../../shared/constrant';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { LearnService } from './learn.service';

const createLearnTopic = catchAsync(async (req, res) => {
  let image;
  if (req.files && 'image' in req.files && req.files.image[0]) {
    image = `/images/${req.files.image[0].filename}`;
  }

  const values = { image, ...req.body };
  const result = await LearnService.createLearnTopicToDB(values);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Topic created successfully',
    data: result,
  });
});

const getAllLearnTopic = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const result = await LearnService.getAllLearnTopicFromDB(paginationOptions);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Learn topic retrieve successfully',
    pagination: result.meta,
    data: result.data,
  });
});

const updateLearnTopic = catchAsync(async (req, res) => {
  const id = req.params.id;
  let image;
  if (req.files && 'image' in req.files && req.files.image[0]) {
    image = `/images/${req.files.image[0].filename}`;
  }

  const values = { image, ...req.body };
  const result = await LearnService.updateLearnTopicToDB(id, values);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Learn Topic updated successfully',
    data: result,
  });
});

const deleteLearnTopic = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await LearnService.deleteLearnTopicFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Learn Topic delete successfully',
    data: result,
  });
});

export const LearnController = {
  createLearnTopic,
  getAllLearnTopic,
  deleteLearnTopic,
  updateLearnTopic,
};
