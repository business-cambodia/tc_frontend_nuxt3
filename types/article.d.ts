import { ICategory } from "./category";
import { IAuthor } from "./author";

export interface IArticle {
  title: string;
  date_created: Date;
  views: number;
  slug: string;
  user_created: IAuthor;
  category: ICategory;
  thumbnail: string;
  length: number;
  body: string;
  keywords: string;
  thumbnail_facebook: string;
}