import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { SubscribeController } from './subscribe.controller';
const router = express.Router();

router
  .route('/')
  .get(auth(USER_ROLES.ADMIN), SubscribeController.getAllSubscribe)
  .post(SubscribeController.createSubscribe);

export const SubscribeRoutes = router;
