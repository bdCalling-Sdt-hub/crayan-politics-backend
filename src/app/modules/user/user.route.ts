import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.get('/profile', auth(USER_ROLES.ADMIN), UserController.getUserProfile);

router.patch(
  '/update-profile',
  auth(USER_ROLES.ADMIN),
  fileUploadHandler(),
  UserController.updateProfile
);

export const UserRoutes = router;
