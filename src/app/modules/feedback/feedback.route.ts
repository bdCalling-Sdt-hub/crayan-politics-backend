import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { FeedbackController } from './feedback.controller';
const router = express.Router();

router
  .route('/')
  .get(auth(USER_ROLES.ADMIN), FeedbackController.getAllFeedback)
  .post(FeedbackController.createFeedback);

export const FeedbackRoutes = router;
