import { Model } from 'mongoose';

export type INews = {
  title: string;
  image: string;
  description: string;
  highlight: boolean;
};

export type NewsModel = {
  highlightSwitcher(id: string): Promise<any>;
} & Model<INews>;
