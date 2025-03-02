import { Category } from "./category";

export interface Products {
    id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category : Category;
  images : string[];
  creationAt : Date ;
  updatedAt : Date;
}


export interface ProductsTax extends Products {
tax: number;
}


