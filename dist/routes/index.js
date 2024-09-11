"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../app/modules/auth/auth.route");
const candidate_route_1 = require("../app/modules/candidate/candidate.route");
const donate_route_1 = require("../app/modules/donate/donate.route");
const election_route_1 = require("../app/modules/election/election.route");
const faq_route_1 = require("../app/modules/faq/faq.route");
const feedback_route_1 = require("../app/modules/feedback/feedback.route");
const learn_route_1 = require("../app/modules/learn/learn.route");
const news_route_1 = require("../app/modules/news/news.route");
const rule_route_1 = require("../app/modules/rule/rule.route");
const state_route_1 = require("../app/modules/state/state.route");
const subscribe_route_1 = require("../app/modules/subscribe/subscribe.route");
const user_route_1 = require("../app/modules/user/user.route");
const voterIssue_route_1 = require("../app/modules/voterIssue/voterIssue.route");
const router = express_1.default.Router();
const apiRoutes = [
    {
        path: '/user',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/election',
        route: election_route_1.ElectionRoutes,
    },
    {
        path: '/state',
        route: state_route_1.StateRoutes,
    },
    {
        path: '/candidate',
        route: candidate_route_1.CandidateRoutes,
    },
    {
        path: '/rule',
        route: rule_route_1.RuleRoutes,
    },
    {
        path: '/subscribe',
        route: subscribe_route_1.SubscribeRoutes,
    },
    {
        path: '/faq',
        route: faq_route_1.FaqRoutes,
    },
    {
        path: '/learn',
        route: learn_route_1.LearnRoutes,
    },
    {
        path: '/feedback',
        route: feedback_route_1.FeedbackRoutes,
    },
    {
        path: '/news',
        route: news_route_1.NewsRoutes,
    },
    {
        path: '/voter-issue',
        route: voterIssue_route_1.VoterIssueRoutes,
    },
    {
        path: '/donate',
        route: donate_route_1.DonateRoutes,
    },
];
apiRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
