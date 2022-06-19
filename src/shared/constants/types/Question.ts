import { Tag } from './Tag';

export interface Question {
  _id: string;
  userId: string;
  user?: any;
  title: string;
  content: string;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
