import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { VoterIssueController } from './voterIssue.controller';
const router = express.Router();

router
  .route('/')
  .get(auth(USER_ROLES.ADMIN), VoterIssueController.getAllVoterIssue)
  .post(VoterIssueController.createVoterIssue);

export const VoterIssueRoutes = router;
