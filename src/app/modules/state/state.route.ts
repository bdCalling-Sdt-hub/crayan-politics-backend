import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { StateController } from './state.controller';
const router = express.Router();

router
  .route('/:id')
  .patch(auth(USER_ROLES.ADMIN), StateController.updateState)
  .delete(auth(USER_ROLES.ADMIN), StateController.deleteState);

router
  .route('/')
  .get(StateController.getAllState)
  .post(auth(USER_ROLES.ADMIN), StateController.createState);

export const StateRoutes = router;
