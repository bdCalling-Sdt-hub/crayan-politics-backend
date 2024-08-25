import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FaqController } from './faq.controller';
import { FaqValidation } from './faq.validation';
const router = express.Router();

// frequently ask question (faq);
router.post(
  '/create-faq',
  auth(USER_ROLES.ADMIN),
  validateRequest(FaqValidation.createFaqZodSchema),
  FaqController.createFaq
);

router
  .route('/:id')
  .patch(
    auth(USER_ROLES.ADMIN),
    validateRequest(FaqValidation.updateFaqZodSchema),
    FaqController.updateFaq
  )
  .delete(auth(USER_ROLES.ADMIN), FaqController.deleteFaq);

router.get('/', FaqController.getAllFaq);

export const FaqRoutes = router;
