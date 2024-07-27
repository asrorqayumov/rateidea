import { IUser } from './IUser';

export interface IVote {
  id: number;
  isUpvote: boolean;
  user: IUser;
  idea: string;
}
