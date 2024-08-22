import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { ElectionRoutes } from '../app/modules/election/election.route';
import { StateRoutes } from '../app/modules/state/state.route';
import { UserRoutes } from '../app/modules/user/user.route';
const router = express.Router();

const apiRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/election',
    route: ElectionRoutes,
  },
  {
    path: '/state',
    route: StateRoutes,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
