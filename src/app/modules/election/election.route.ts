import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ElectionController } from './election.controller';
const router = express.Router();

router
  .route('/')
  .post(auth(USER_ROLES.ADMIN), ElectionController.createElection);

export const electionRoutes = router;
