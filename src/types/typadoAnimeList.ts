
export interface QueryVariables {
  id?: number
  sort?: "ID" | string;
  search?: string
}

export type Res = {
  data: Data;
}

export type Data = {
  Page: Page;
}

export type Page = {
  media: Media[];
}

export type Media = {
  id: number;
  title: Title;
  tags: Tag[];
  status: Status;
  bannerImage: string;
  coverImage: CoverImage;
  description: string;
}

export type CoverImage = {
  extraLarge: string;
  large: string;
  medium: string;
  color: null | string;
}

export enum Status {
  Finished = "FINISHED",
  Releasing = "RELEASING",
}

export type Tag = {
  name: string;
}

export type Title = {
  userPreferred: string;
}

