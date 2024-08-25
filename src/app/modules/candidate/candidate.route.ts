import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { CandidateController } from './candidate.controller';

const router = express.Router();

router.post(
  '/add-candidate',
  auth(USER_ROLES.ADMIN),
  fileUploadHandler(),
  CandidateController.addCandidate
);

router
  .route('/:id')
  .get(CandidateController.getSingleCandidate)
  .patch(
    auth(USER_ROLES.ADMIN),
    fileUploadHandler(),
    CandidateController.updateCandidate
  )
  .delete(auth(USER_ROLES.ADMIN), CandidateController.deleteCandidate);

//candidate issues
router
  .route('/candidate-issues/:id')
  .patch(auth(USER_ROLES.ADMIN), CandidateController.updateCandidateIssues)
  .delete(auth(USER_ROLES.ADMIN), CandidateController.deleteCandidateIssue);

router.get('/', CandidateController.getAllCandidate);

export const CandidateRoutes = router;
