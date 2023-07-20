export interface ICategory {
    id?: string;
    name: string;
    slug: string;
    description?: string;
    thumbnail: string;
    articles: IArticle;
  }