import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { paginationFields } from '../../../shared/constrant';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { NewsService } from './news.service';

const createNews = catchAsync(async (req, res) => {
  let image;
  if (req.files && 'image' in req.files && req.files.image[0]) {
    image = `/images/${req.files.image[0].filename}`;
  }

  const values = { image, ...req.body };
  const result = await NewsService.createNewsToDB(values);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'News created successfully',
    data: result,
  });
});

const getAllNews = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filterOptions = pick(req.query, ['searchTerm']);
  const result = await NewsService.getAllNewsFromDB(
    paginationOptions,
    filterOptions
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All news retrieve successfully',
    pagination: result.meta,
    data: result.data,
  });
});

const getSingleNews = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await NewsService.getSingleNewsFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Single news retrieve successfully',
    data: result,
  });
});

const getTopNews = catchAsync(async (req, res) => {
  const result = await NewsService.getTopNewsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Top news retrieve successfully',
    data: result,
  });
});

const updateNews = catchAsync(async (req, res) => {
  const id = req.params.id;
  let image;
  if (req.files && 'image' in req.files && req.files.image[0]) {
    image = `/images/${req.files.image[0].filename}`;
  }

  const values = { image, ...req.body };
  const result = await NewsService.updateNewsToDB(id, values);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'News updated successfully',
    data: result,
  });
});

const deleteNews = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await NewsService.deleteNewsFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'News delete successfully',
    data: result,
  });
});

//highlight news
const getAllHighlightNews = catchAsync(async (req, res) => {
  const result = await NewsService.getAllHighlightNewsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Top news retrieve successfully',
    data: result,
  });
});

const highlightNews = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await NewsService.highlightNewsToDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'News highlight successfully',
    data: result,
  });
});

export const NewsController = {
  createNews,
  getAllNews,
  deleteNews,
  updateNews,
  getSingleNews,
  getTopNews,
  getAllHighlightNews,
  highlightNews,
};
