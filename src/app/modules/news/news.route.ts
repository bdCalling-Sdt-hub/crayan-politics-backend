import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { NewsController } from './news.controller';
const router = express.Router();

router.post(
  '/create-news',
  auth(USER_ROLES.ADMIN),
  fileUploadHandler(),
  NewsController.createNews
);

router.get('/top-news', NewsController.getTopNews);

router
  .route('/:id')
  .get(NewsController.getSingleNews)
  .patch(auth(USER_ROLES.ADMIN), fileUploadHandler(), NewsController.updateNews)
  .delete(auth(USER_ROLES.ADMIN), NewsController.deleteNews);

router.get('/', NewsController.getAllNews);

export const NewsRoutes = router;
