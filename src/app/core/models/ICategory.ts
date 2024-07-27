import { IIdea } from './IIdea';

export interface ICategory {
  id: number;
  name: string;
  description: string;
  image: {
    id: number;
    fileName: string;
    filePath: string;
  };
  ideas: IIdea[];
}
