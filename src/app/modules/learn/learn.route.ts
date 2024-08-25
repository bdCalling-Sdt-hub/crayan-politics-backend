import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { LearnController } from './learn.controller';
const router = express.Router();

router
  .route('/:id')
  .patch(
    auth(USER_ROLES.ADMIN),
    fileUploadHandler(),
    LearnController.updateLearnTopic
  )
  .delete(auth(USER_ROLES.ADMIN), LearnController.deleteLearnTopic);

router
  .route('/')
  .get(LearnController.getAllLearnTopic)
  .post(
    auth(USER_ROLES.ADMIN),
    fileUploadHandler(),
    LearnController.createLearnTopic
  );

export const LearnRoutes = router;
