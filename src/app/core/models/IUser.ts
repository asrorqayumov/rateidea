import { IIdea } from './IIdea';
import { Roles } from './Roles';
import { IVote } from './IVote';
import { IComment } from './IComment';
import { IImage } from './IImage';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  role: Roles;
  dateOfBirth: Date;
  image: IImage;
  ideas: IIdea[];
  ideaVotes: IVote[];
  comments: IComment[];
  commentVotes: IVote[];
}
