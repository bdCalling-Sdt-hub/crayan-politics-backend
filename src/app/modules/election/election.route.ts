import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ElectionController } from './election.controller';
const router = express.Router();

router
  .route('/:id')
  .patch(auth(USER_ROLES.ADMIN), ElectionController.updateElection)
  .delete(auth(USER_ROLES.ADMIN), ElectionController.deleteElection);

router
  .route('/')
  .get(ElectionController.getAllElection)
  .post(auth(USER_ROLES.ADMIN), ElectionController.createElection);

export const ElectionRoutes = router;
