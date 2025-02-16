import { ICategory } from "./category";
import { IAuthor } from "./author";

export interface IArticle {
  id: string;
  sum: any;
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
  telegram_embed: string;
  thumbnail_facebook: string;
}