import { IVote } from './IVote';

export interface IComment {
  id: number;
  content: string;
  idea: string;
  user: string;
  votes: IVote;
}
