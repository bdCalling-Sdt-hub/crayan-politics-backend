import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { CandidateRoutes } from '../app/modules/candidate/candidate.route';
import { ElectionRoutes } from '../app/modules/election/election.route';
import { FaqRoutes } from '../app/modules/faq/faq.route';
import { FeedbackRoutes } from '../app/modules/feedback/feedback.route';
import { LearnRoutes } from '../app/modules/learn/learn.route';
import { NewsRoutes } from '../app/modules/news/news.route';
import { RuleRoutes } from '../app/modules/rule/rule.route';
import { StateRoutes } from '../app/modules/state/state.route';
import { SubscribeRoutes } from '../app/modules/subscribe/subscribe.route';
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
  {
    path: '/candidate',
    route: CandidateRoutes,
  },
  {
    path: '/rule',
    route: RuleRoutes,
  },
  {
    path: '/subscribe',
    route: SubscribeRoutes,
  },
  {
    path: '/faq',
    route: FaqRoutes,
  },
  {
    path: '/learn',
    route: LearnRoutes,
  },
  {
    path: '/feedback',
    route: FeedbackRoutes,
  },
  {
    path: '/news',
    route: NewsRoutes,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
