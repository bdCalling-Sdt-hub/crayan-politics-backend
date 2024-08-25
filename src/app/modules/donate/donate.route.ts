import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { DonateController } from './donate.controller';
const router = express.Router();

router.post('/create-payment-intent', DonateController.createPaymentIntent);

router
  .route('/')
  .get(auth(USER_ROLES.ADMIN), DonateController.getAllDonateList)
  .post(DonateController.createDonate);

export const DonateRoutes = router;
