import { Model } from 'mongoose';

export type IIssues = { question: string; answer: string };

export type ICandidate = {
  name: string;
  image: string;
  politicalAffiliation:
    | 'Republican'
    | 'Democratic'
    | 'Libertarian'
    | 'Green'
    | 'Others';
  state: string;
  election: string;
  color: '#FF7070' | '#6788DF' | '#F5E3A4' | '#9CE7A3' | '#A6A6A6';
  issues?: IIssues[];
};

export type CandidateModel = {
  getIssues(id: string): any;
} & Model<ICandidate>;
