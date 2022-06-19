import { User } from './User';

export interface Answer {
  _id: string;
  userId: string;
  questionId: string;
  content: string;
  userLikes: object;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
  __v: number;
}
