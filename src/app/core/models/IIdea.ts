import { ICategory } from './ICategory';
import { IComment } from './IComment';
import { IImage } from './IImage';
import { IUser } from './IUser';
import { IVote } from './IVote';

export interface IIdea {
  id: number;
  title: string;
  description: string;
  image: IImage;
  isSaved: boolean;
  category: ICategory;
  user: IUser;
  comments: IComment[];
  votes: IVote[];
}
